const {
  writeFile,
  mkdirSync,
  readdirSync,
  readFileSync
} = require('fs');
const joinPath = require('./joinPath');
const { existsSync } = require('./isExists');

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
