/**
 * @file 在执行完 electron-builder 后的操作
 * @description 现在是只有对 app/core 目录进行移动
 */

const { moveDir } = require('./file');

exports.default = function () {
  // const folder = joinPath(process.cwd(), 'core');
  // const destFolder = joinPath(process.cwd(), 'app/core');
  moveDir('core', 'app/core');
};
