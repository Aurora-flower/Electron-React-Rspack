/**
 * @file 执行编译任务
 */
const {
  copyHandler,
  readHandler,
  writeHandler
} = require('../utils/file');
const webpack = require('webpack');
const { rimraf } = require('rimraf');
const { task, series } = require('gulp');
const { getArgv } = require('../utils/argv');
const joinPath = require('../utils/joinpath');
const getConfig = require('../webpack/getConfig');

/**
 * 清理构建目录
 * @description 这里使用的 gulp 传统任务的编写方式 - 回调模式
 * @param {Function} cb 是 gulp 的回调函数
 * @remarks
 * `cb`是回调函数，全称应该是 callback。
 * 在 Gulp 任务中，当任务完成时，必须调用这个回调函数来通知 Gulp 该任务已经结束。
 * 这是 Gulp 处理异步任务的一种传统方式。
 */
function clean(cb) {
  rimraf('./app')
    .then(() => cb())
    .catch(error => cb(error));
}

/**
 * 匹配编译构建过程的错误信息
 * @param {string} log 构建过程中输出的日志信息
 * @returns {string[]} 匹配到的错误信息数组
 */
function findErrors(log) {
  const regex = /ERROR.*/g;
  const matches = [];
  let match;
  while ((match = regex.exec(log)) !== null) {
    matches.push(match[0]);
  }
  return matches;
}

/**
 * 编译构建项目
 * @description 这里使用的现代 gulp 任务的编写方式 - （返回）Promise 模式
 * @returns {Promise<*>}
 */
function compile() {
  return new Promise((resolve, reject) => {
    const argInfo = getArgv();
    const webpackConfig = getConfig(argInfo.mode);
    try {
      const compiler = webpack(webpackConfig);
      compiler.run(function (_err, stats) {
        console.log(
          'Compile info:',
          findErrors(stats.toString())
        );
        resolve(stats);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 编译完成后的回调函数, 做收尾处理
 * @description 这里使用的现代 gulp 任务的编写方式 - Async/Await 模式
 * @returns {Promise<void>}
 */
async function compileAfter() {
  // TODO: 对 package 文件进行拷贝并修改处理
  const CWD = process.cwd();
  const source = new Proxy(
    {
      src: './package.json',
      dest: './app/package.json'
    },
    {
      get(target, prop) {
        if (prop in target) {
          return joinPath(CWD, target[prop]);
        }
        return undefined;
      }
    }
  );
  // const res =
  await copyHandler(source.src, source.dest);
  const json = await readHandler(source.dest);
  json.main = 'electron/main.js';
  delete json.scripts;
  delete json.devDependencies;
  await writeHandler(source.dest, json);
  // console.log('compileAfter:', res, json);
}

/**
 * @summary 编译任务完整流程
 */
const buildSeries = series(clean, compile, compileAfter);

task('compile', buildSeries);

module.exports = {
  clean,
  compile,
  compileAfter,
  buildSeries
};
