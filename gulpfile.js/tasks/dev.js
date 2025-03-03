/**
 * @file 开发运行任务
 * @description
 * 结合 rspack 与 gulp 构建
 */
const { task } = require('gulp');
const { compile } = require('../rs');
// const { series } = require('gulp');
const getArgv = require('../utils/argv');
const { BuildingEnvironment } = require('../common/env');

/* 获取命令行参数 */
const args = getArgv();

// ==================== 获取参数 ====================
if (!process.env.NODE_ENV) {
  /* 获取构建环境 */
  const mode = args.mode || BuildingEnvironment.Dev;

  /* 设置 NODE_ENV */
  process.env.NODE_ENV = mode;

  console.log('Compile mode:', mode, process.env.NODE_ENV);
}

/* ***** ***** ***** ***** 开发任务 ***** ***** ***** ***** */

async function dev() {
  const res = await compile();
  console.log('dev task done...', res);
}

task('test', dev);
