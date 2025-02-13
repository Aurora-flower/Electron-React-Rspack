/**
 * @file 用于调试 getConfig 与 compile
 */
const { task } = require('gulp');
const getConfig = require('../webpack/getConfig');

function debug(cd) {
  getConfig();

  cd();
}

task('debug', debug);
