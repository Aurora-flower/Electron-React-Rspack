/**
 * @file 用于调试 getConfig 与 compile
 */
const { task } = require('gulp');

function debug(cd) {
  cd();
}

task('debug', debug);
