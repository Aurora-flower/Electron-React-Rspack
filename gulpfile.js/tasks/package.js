/**
 * @file 执行打包任务，使用 electron-builder
 * @see {@link https://www.electron.build electron-builder 文档}
 * @description
 */
const { rimraf } = require('rimraf');
const { getArgv } = require('../utils/argv');
// const builder = require('electron-builder');
// const { buildSeries } = require('./compile');
const { task /* , series, watch, parallel */ } = require('gulp');

const CWD = process.cwd(); /* 当前工作目录  */

// const Platform = builder.Platform;

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see {@link https://www.electron.build/configuration electron-builder 配置文档}
 */
// const options = {};

task('package', async function (done) {
  console.log('Packing...', CWD);
  await rimraf('./app');
  getArgv();
  // builder
  //   .build({
  //     targets: builder.Platform.MAC.createTarget(),
  //     config: options
  //   })
  //   .then(result => {
  //     console.log(JSON.stringify(result));
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  done();
});
