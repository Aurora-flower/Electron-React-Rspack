const {
  rename,
  copyFile,
  constants,
  stat,
  statSync,
  readFileSync,
  writeFile
} = require('node:fs');
const { parse } = require('node:path');

const JsonFormatExtension = ['.json', '.prefab', '.fire'];

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
  } catch (error) {
    return false;
  }
}

function parseUint8Array(uint8Array, type = 'utf-8') {
  const decoder = new TextDecoder(type);
  return decoder.decode(uint8Array);
}

function exists(filepath) {
  return new Promise(resolve => {
    stat(filepath, (err /* , stats */) => {
      resolve(!err);
    });
  });
}

function copyHandler(src, dest) {
  return new Promise(resolve => {
    copyFile(
      src,
      dest,
      constants.COPYFILE_EXCL /* 如果目标文件已存在，则不应覆盖该文件的标志。 */,
      err => {
        resolve(!err);
      }
    );
  });
}

function writeJsonFile(filepath, data) {
  return new Promise(resolve => {
    const ext = parse(filepath).ext;
    if (JsonFormatExtension.includes(ext)) {
      const json = JSON.stringify(data, null, 2);
      writeFile(filepath, json, err => {
        resolve(!err);
      });
    }
  });
}

function renameHandler(oldPath, newPath) {
  return new Promise(resolve => {
    rename(oldPath, newPath, err => {
      resolve(!err);
    });
  });
}

function readJsonFileToData(filepath) {
  return new Promise(resolve => {
    if (exists(filepath)) {
      const ext = parse(filepath).ext;
      const buffer = readFileSync(filepath);
      if (JsonFormatExtension.includes(ext) && buffer.length) {
        resolve(JSON.parse(buffer.toString()));
        try {
          // Object.prototype.toString.call(buffer) === '[object Uint8Array]'
          const isU8 = buffer instanceof Uint8Array;
          const data = isU8
            ? parseUint8Array(buffer)
            : JSON.parse(buffer.toString('utf-8'));
          resolve(data);
        } catch (error) {
          resolve(!error?.message);
        }
        return;
      }
      console.log('readJsonFileToData', ext);
      resolve(null);
    } else {
      resolve(null);
    }
  });
}

module.exports = {
  copyHandler,
  existsSync,
  readJsonFileToData,
  writeJsonFile,
  renameHandler
};
