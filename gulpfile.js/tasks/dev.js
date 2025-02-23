/**
 * @file 开发运行任务
 * @description
 * 结合 rspack 与 gulp 构建
 */
const { task } = require('gulp');
// const { RspackCLI } = require('@rspack/cli');
const { getArgv } = require('../utils/argv');
const { series } = require('gulp');

/* ***** ***** ***** ***** 开发任务 ***** ***** ***** ***** */

async function dev() {
  const args = getArgv();
  console.log('dev task running...', args);
}

task('dev', dev);
