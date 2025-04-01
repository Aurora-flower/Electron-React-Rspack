/**
 * @file 构建过程中用到的文件处理函数
 */
const {
  writeFile,
  mkdirSync,
  statSync,
  readdirSync,
  readFileSync
} = require('node:fs');
const { join } = require('node:path');

/**
 * @summary 判断文件是否存在
 * @param {string} localPath 文件或目录的路径
 * @param {*} type 校验类型，可选值：File | Directory | undefined
 * @returns {boolean} 是否存在且符合类型
 */
function existsSync(localPath, type) {
  try {
    const stats = statSync(localPath);
    return type == 'File'
      ? stats.isFile()
      : type == 'Directory'
        ? stats.isDirectory()
        : !!stats;
  } catch (error) {
    return false;
  }
}

/**
 * @summary 移动目录（包含子级目录与文件）到指定目录
 * @param {*} sourceDir
 * @param {*} targetDir 目标目录
 * @returns {Promise<boolean>} 是否成功
 */
function moveDir(sourceDir, targetDir) {
  return new Promise(resolve => {
    if (!existsSync(sourceDir, 'Directory')) {
      console.error('The target source does not exist');
      resolve(false);
      return;
    }
    if (!existsSync(targetDir, 'Directory')) {
      mkdirSync(targetDir, { recursive: true });
    }
    readdirSync(sourceDir).forEach(file => {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);
      if (existsSync(sourcePath, 'File')) {
        writeFile(targetPath, readFileSync(sourcePath), err => {
          resolve(!err);
        });
      } else if (existsSync(sourcePath, 'Directory')) {
        moveDir(sourcePath, targetPath);
      }
    });
  });
}

module.exports = { moveDir };
