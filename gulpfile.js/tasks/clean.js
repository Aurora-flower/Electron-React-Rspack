/**
 * @file 承担编译任务
 */
const { rimraf } = require('rimraf');

async function clean() {
  await rimraf([
    'release' /* 应用构建输出 */,
    'app' /* 源码构建输出 */
  ]);
}

module.exports = clean;
