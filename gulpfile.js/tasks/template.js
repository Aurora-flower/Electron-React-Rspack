/**
 * @file gulp 撰写任务示例
 * @description
 * - 每个 gulp 任务都是一个 **异步** JavaScript 函数 - 接受错误优先回调或返回流、promise、事件触发器、子进程或可观察对象的函数。
 * - 任务可以被视为`公共`或`私有`。
 *    - 公共任务: 从 `gulpfile` 中导出，这允许它们通过 gulp 命令运行
 *    - 私有任务: 供内部使用，通常用作 `series()` 或 `parallel()` 组合的一部分。
 * - 当从任务返回流、Promise、事件触发器、子进程或可观察对象时，成功或错误会通知 gulp 是继续还是结束。
 *   如果任务出错，gulp 将立即结束并显示该错误。
 *
 * @remarks
 * - gulp 不再支持同步任务。
 * 它们通常会导致难以调试的微妙错误，例如忘记从任务中返回流。
 */
// const { rollup } = require('rollup');
const through2 = require('through2');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const { Observable } = require('rxjs'); // rxjs 是 JavaScript 的响应式编程库，提供 Observable 等核心异步处理能力。
const { exec } = require('node:child_process');
const { EventEmitter } = require('node:events');
const { src, dest, watch, series, parallel } = require('gulp');

/* ***** ***** ***** ***** Gulp 任务回调书写示例 ***** ***** ***** ***** */

/* 示例1: 常规任务回调（错误优先回调） */
function legacyCallback(cb) {
  /**
   * @summary
   * - 默认回调函数，必须调用 `cb`，否则 gulp 会认为任务未完成
   * - 使用错误优先回调指示 gulp 任务中发生了错误，错误对象（`Error`）作为第一个参数传入，如果无错误传入则表示任务完成。
   */
  cb(); //  new Error('kill')
}

/* 示例2: 异步函数 - async/await */
async function asyncCallback() {}

/* 示例3: 异步函数 - promise */
function promiseCallback() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

/* 示例4: 流式处理 */
function streamCallback() {
  return src('*.js').pipe(dest('output'));
}

/* 示例5: 事件触发器 */
function eventEmitterCallback() {
  const emitter = new EventEmitter();
  // Emit has to happen async otherwise gulp isn't listening yet
  setTimeout(() => emitter.emit('finish'), 250);
  return emitter;
}

/* 示例6: 子进程 */
function childProcessCallback() {
  /**
   * @summary 运行 date 命令获取当前系统时间 (Unix/Linux/macOS 生效，Windows 需改为 `date /T`)
   */
  const subProcess = exec('date', error => {
    if (error) throw new Error(`执行失败: ${error.message}`);
  });

  // 监听进程输出 (可选)
  subProcess.stdout.on('data', data => {
    console.log('DATE 输出:', data.toString());
  });

  /* 进程管理：Gulp 会监控子进程状态，自动处理任务完成/错误通知 */
  return subProcess;
}

/* 示例7: 可观察对象函数 */
function observableCallback() {
  /* 虽然 Gulp 原生支持流(Stream)和 Promise，但通过 RxJS 的 Observable 可以实现更复杂的异步流程控制（需手动集成）。 */
  return Observable.of(1, 2, 3);
}

/* ***** ***** ***** ***** Gulp 文件处理 - `series()` 和 `parallel()` 可以嵌套到任意深度 ***** ***** ***** ***** */

/**
 * @summary
 * 示例: 混淆所有 JavaScript 文件
 * @description
 * -`src()` 被给予 `glob` 以从文件系统读取并生成 Node 流。
 * 它找到所有匹配的文件并将它们读入内存以通过流。
 * - `src()` 还可以放置在管道中间，以根据给定的 `glob` 将文件添加到流中。
 * 附加文件仅可用于流中稍后的转换。
 * 如果是 `通配符重叠`，将再次添加文件。
 * 使用场景：将纯 JavaScript 文件添加到管道并混淆所有内容之前转译某些文件
 * - `src()` 可以在三种模式下运行：*缓冲、流式传输和清空*。
 *
 * @remarks
 * - `缓冲模式`是默认模式，并将文件内容加载到内存中。
 * 插件通常在缓冲模式下运行，许多插件不支持流模式。
 * - `流模式`的存在主要是为了操作内存无法容纳的大文件，例如巨大的图片或电影。
 * 内容以小块的形式从文件系统流式传输，而不是一次全部加载。
 * - `空模式`不包含任何内容，并且在仅处理文件元数据时很有用。
 */
function filePipeStream() {
  return src('source/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(uglify())
    .pipe(dest('output/'));
}

/**
 * @summary 分相输出
 * @description
 * - `dest()` 被赋予一个输出目录，它将流中的文件写入该目录。
 * - `dest()` 可以用在管道中间，将中间状态写入文件系统。
 * 接收到文件时，当前状态将写入文件系统，更新路径以表示输出文件的新位置，然后该文件继续沿着管道向下传输。
 * 使用场景: 使用同一管道创建未缩小和缩小的文件非常有用
 */
function splitPhaseOutput() {
  return src('source/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}

/* ***** ***** ***** ***** Gulp 任务组合 - `series()` 和 `parallel()` 可以嵌套到任意深度 ***** ***** ***** ***** */

/**
 * @summary 示例1: 顺序组合
 * @description
 * - 当运行组合操作时，每个任务将在每次引用时执行。
 * - 当使用 `series()` 组合任务时，出现错误将结束组合并且不会执行进一步的任务。
 */
const order = series(
  legacyCallback,
  asyncCallback,
  promiseCallback
);

/**
 * @summary 示例2: 并行组合
 * @description
 * 当使用 `parallel()` 组合任务时，错误将结束组合，但其他并行任务可能会完成，也可能不会完成。
 */
const pairing = parallel(
  legacyCallback,
  asyncCallback,
  promiseCallback
);

/* ***** ***** ***** ***** Gulp 内联插件 ***** ***** ***** ***** */

/**
 * @summary 内联插件是通过编写所需行为在 gulpfile 中定义的一次性转换流。
 */
function inlinePlugin() {
  return (
    src('source/*.js')
      // Instead of using gulp-uglify, you can create an inline plugin
      .pipe(
        through2.obj(function (file, _, cb) {
          if (file.isBuffer()) {
            const code = uglify.minify(file.contents.toString());
            file.contents = Buffer.from(code.code);
          }
          cb(null, file);
        })
      )
      .pipe(dest('output/'))
  );
}

/* ***** ***** ***** ***** 任务监听 ***** ***** ***** ***** */

/**
 * @summary
 * 监听文件变化触发任务
 * @description
 * - 此 API 提供基于最常用默认值的内置延迟和排队
 * - `watch()` API 使用文件系统监视器将 `globs` 连接到 tasks。
 * 它监视与 glob 匹配的文件的更改，并在发生更改时执行任务。
 * 如果任务没有触发 `异步完成` 信号，则它将永远不会运行第二次。
 * - 每个 `watch()` 保证其当前正在运行的任务不会再次并发执行。
 * 当观察程序任务运行时发生文件更改时，另一个执行将排队等待该任务完成时运行。
 * 一次只能排队一个运行。
 * - `watch()` 返回的 `chokidar` 实例没有队列、延迟或异步完成功能。
 *
 * 注意📢:
 * 观察者的任务不能是同步的。如果传递同步任务，则无法确定完成情况，并且任务不会再次运行。
 */
function watchCallback() {
  watch(
    'source/*.js',
    {
      /* 触发类型 */
      events: 'change',
      /* 忽略初始执行 */
      ignoreInitial: false,
      /* 延迟时间 - 文件更改后，观察程序任务将在指定时间（毫秒）的延迟过后才会运行 */
      delay: 500
    },
    series(inlinePlugin)
  );
}

/* ***** ***** ***** ***** Gulp 公有任务的导出 ***** ***** ***** ***** */

// 另一种导出方式: exports.xxx = xxx
module.exports = {
  order,
  pairing,
  inlinePlugin,
  filePipeStream,
  splitPhaseOutput,
  streamCallback,
  legacyCallback,
  asyncCallback,
  watchCallback,
  promiseCallback,
  observableCallback,
  childProcessCallback,
  eventEmitterCallback
};
