const { join } = require('node:path');

/**
 * @summary 用于拼接路径，处理为可被 shell 执行的路径
 */
function joinPath(...paths) {
  try {
    const base = join(...paths);
    return process.platform == 'win32'
      ? base.replace(/\\/g, '/')
      : base.replace(/(?=\W+)\s+(?<=\W+)/g, '\\ ');
  } catch (error) {
    console.log(error?.message);
    return '';
  }
}

// #region debug
// console.log(
//   process.platform,
//   joinPath(
//     '/Users/HuaYing/Desktop/Program File/Demo'
//     // 'C:\\Users\\Administrator\\Desktop\\Program File\\Demo'
//   )
// );
// #endregion

module.exports = joinPath;
