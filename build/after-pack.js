/**
 * @file 在执行完 electron-builder 后的操作
 * @description 现在是只有对 app/core 目录进行移动
 */

const { moveDir } = require('./utils/file');

exports.default = function () {
  // const folder = join(process.cwd(), 'core');
  // const destFolder = join(process.cwd(), 'app/core');
  moveDir('gen', 'app/gen');
  moveDir('core', 'app/core');
};
