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

/**
 * @constant JSON_FORMAT_EXTENDSION JSON 格式文件后缀
 */
const JSON_FORMAT_EXTENDSION = ['.json', '.prefab', '.fire'];

/**
 * @summary 判断是否存在，且在传入 type 时判断是否符合
 * @param {*} localPath 本地路径
 * @param {*} type 文件类型
 * @returns 是否符合
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
 * @summary 解析 Uint8Array
 * @param {*} uint8Array Uint8Array
 * @param {*} type 解析类型
 * @returns 解析后的字符串
 */
function parseUint8Array(uint8Array, type = 'utf-8') {
  const decoder = new TextDecoder(type);
  return decoder.decode(uint8Array);
}

/**
 * @summary 判断文件是否存在
 * @param {*} filepath 文件路径
 * @returns {Promise<*>}
 */
function exists(filepath) {
  return new Promise(resolve => {
    stat(filepath, (err /* , stats */) => {
      resolve(!err);
    });
  });
}

/**
 * @summary 复制文件
 * @param {*} src 源文件
 * @param {*} dest 目标文件
 * @returns {Promise<*>}
 */
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

/**
 * @summary 写入 JSON 文件
 * @param {*} filepath 文件路径
 * @param {*} data 数据
 * @returns {Promise<*>}
 */
function writeJsonFile(filepath, data) {
  return new Promise(resolve => {
    const ext = parse(filepath).ext;
    if (JSON_FORMAT_EXTENDSION.includes(ext)) {
      const json = JSON.stringify(data, null, 2);
      writeFile(filepath, json, err => {
        resolve(!err);
      });
    }
  });
}

/**
 * @summary 重命名文件
 * @param {*} oldPath 旧路径
 * @param {*} newPath 新路径
 * @returns {Promise<*>}
 */
function renameHandler(oldPath, newPath) {
  return new Promise(resolve => {
    rename(oldPath, newPath, err => {
      resolve(!err);
    });
  });
}

/**
 * @summary 读取 JSON 文件并解析为对象
 * @param {*} filepath 文件路径
 * @returns {Promise<*>}
 */
function readJsonFileToData(filepath) {
  return new Promise(resolve => {
    if (exists(filepath)) {
      const ext = parse(filepath).ext;

      // TODO: 这里有问题，后面进行修改
      const buffer = readFileSync(filepath);
      if (
        JSON_FORMAT_EXTENDSION.includes(ext) &&
        buffer.length
      ) {
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
