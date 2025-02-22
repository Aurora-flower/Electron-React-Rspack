/**
 * @file 开发运行任务
 * @description
 * 结合 rspack 与 gulp 构建
 */
const { RspackCLI } = require('@rspack/cli');
const { task } = require('gulp');
const { getArgv } = require('../utils/argv');
const get = require('../webpack/get_config');

task('dev', async function () {
  const args = getArgv();
  console.log('dev task running...', args, RspackCLI, get());
});
