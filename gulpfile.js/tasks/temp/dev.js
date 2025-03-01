/**
 * @file 开发运行任务
 */
const electron = require('electron');
const { spawn } = require('node:child_process');
const { existsSync } = require('../../utils/file');
// const { /* debounce, */ throttle  } = require('lodash');
const { task, series, watch /*, parallel*/ } = require('gulp');
const {
  /* buildSeries, */
  buildSeriesWatch
} = require('../../webpack/compile');

let electronProcess = null;

async function stop() {
  if (electronProcess) {
    electronProcess.kill();

    /* 等待进程完全退出 */
    await new Promise(resolve => {
      electronProcess.on('exit', () => {
        console.log(
          'Stop origin electron progress pid:',
          electronProcess?.pid
        );
        resolve();
      });
    });
  }
}

async function start() {
  // if (electronProcess) {
  //   electronProcess.kill();

  //   /* 等待进程完全退出 */
  //   await new Promise(resolve => {
  //     electronProcess.on('exit', () => {
  //       console.log(
  //         'Stop origin electron progress pid:',
  //         electronProcess?.pid
  //       );
  //       resolve();
  //     });
  //   });
  // }

  if (!existsSync('./app/electron/main.js', 'File')) {
    console.log('entry file not found');
    return;
  }

  await new Promise((resolve, reject) => {
    electronProcess = spawn(electron, ['.'], {
      stdio: 'inherit'
    });

    electronProcess.on('close', code => {
      console.log(`Subprogress Quit code: ${code}`);
      electronProcess = null;
      resolve();
    });

    electronProcess.on('error', err => {
      console.error('Electron Error:', err?.message);
      reject(err);
    });
    console.log('Electron running ...', electronProcess?.pid);
    resolve();
  });
}

// const debouncedDev = throttle(
//   series(stop, buildSeries, start),
//   3 * 1000
// );

// 另一种语法：exports.dev = function () {};
// task('dev', async function () {
//   const options = {
//     cwd: process.cwd()
//   };
//   /* 监听主进程相关文件变化，并重新启动 Electron */
//   // const Refresh =
//   // watch(
//   //   [mainSource, 'source/common/helper/log.ts'],
//   //   { ignoreInitial: false, ...options },
//   //   series(buildSeries, debouncedStart)
//   // );

//   const Refresh = watch(
//     [
//       '.config/**/*',
//       'public/**/*',
//       'source/**/*',
//       '!source/types'
//     ],
//     { ignoreInitial: false, ...options },
//     debouncedDev
//   );

//   Refresh.on('error', function (error) {
//     console.log('Refresh task Error:', error.message);
//     process.exit(1);
//   });
// });

async function devWatch() {
  const options = {
    cwd: process.cwd()
  };

  const mainSource = 'source/electron/**/*';
  /* 监听文件变化，并重新编译 */
  //   '.config/**/*',
  //   'public/**/*',
  //   'source/**/*',
  //   'source/preload/**/*',
  //   `!${mainSource}`,
  //   `!source/common/helper/log.ts`,
  //   'postcss.config.*',
  //   'tailwind.config.js'
  // ]

  watch(
    [mainSource, '!source/types'],
    {
      ignoreInitial: false,
      ...options,
      // delay: 1000 * 1, // 延迟时间
      // alwaysStat: false, // 关闭不必要的stat信息
      // usePolling: false, // 禁用轮询模式
      // depth: 5, // 限制监控目录深度
      // atomic: true, // 处理原子保存操作
      awaitWriteFinish: {
        stabilityThreshold: 3000, // 文件稳定时间
        pollInterval: 1000 // 检查间隔
      }
    },
    series(stop, start)
  );
}

// task('dev:watch', series(buildSeriesWatch, devWatch));
task('dev', series(buildSeriesWatch, devWatch));
