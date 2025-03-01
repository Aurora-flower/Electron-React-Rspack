/**
 * @file 开发运行任务
 * @description
 * 结合 rspack 与 gulp 构建
 */
const { task } = require('gulp');
const { compile } = require('../rs');
// const { getArgv } = require('../utils/argv');
// const { series } = require('gulp');

/* ***** ***** ***** ***** 开发任务 ***** ***** ***** ***** */

async function dev(done) {
  const res = await compile();
  console.log('dev task done...', res);
  done();
}

task('test', dev);
