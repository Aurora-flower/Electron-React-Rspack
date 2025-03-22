/**
 * @file 用于调试 getConfig 与 compile
 */
const { task } = require('gulp');

function debug(cd) {
  cd();
}

// 这里使用的 task API 注册任务
task('debug', debug);
