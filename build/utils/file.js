const {
  writeFile,
  mkdirSync,
  statSync,
  readdirSync,
  readFileSync
} = require('node:fs');
const joinPath = require('./join_path');

function existsSync(
  localPath,
  type = 'All' // 'File' | 'Directory' | 'All'
) {
  try {
    const stats = statSync(localPath);
    return type == 'File'
      ? stats.isFile()
      : type == 'Directory'
        ? stats.isDirectory()
        : !!statSync(localPath);
  } catch (_error) {
    return !_error;
  }
}

/* 移动目录（包含子级目录与文件）到指定目录 */
function moveDir(sourceDir, targetDir) {
  return new Promise(resolve => {
    if (!existsSync(sourceDir, 'Directory')) {
      console.error('目标源不存在');
      resolve(false);
      return;
    }
    if (!existsSync(targetDir, 'Directory')) {
      mkdirSync(targetDir, { recursive: true });
    }
    readdirSync(sourceDir).forEach(file => {
      const sourcePath = joinPath(sourceDir, file);
      const targetPath = joinPath(targetDir, file);
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
