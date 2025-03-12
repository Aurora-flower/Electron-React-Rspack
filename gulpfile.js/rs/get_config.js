/**
 * @file 获取项目配置
 */
const { join } = require('node:path');
const {
  APP_PROCESS_MODE,
  getFileStructure,
  getDirectoryStructure
} = require('../common/project_structure');
const LOADER = require('./loader');

const _FILE = getFileStructure();
const DIRECTORY = getDirectoryStructure();

/* ***** ***** ***** ***** 项目入口与输出配置 ***** ***** ***** ***** */

/**
 * @summary 生成文件路径
 * @param {string} type - 文件类型
 * @param {string} filename - 文件名
 * @returns {string} - 文件路径
 */
function generateFilePath(type, filename) {
  return join(DIRECTORY.Source[type], filename);
}

/**
 * @summary 入口文件名
 */
const EntryFilename = {
  Main: 'index.ts',
  Vendor: 'vendor.ts'
};

/**
 * @summary 构建入口
 */
const _Entry_ = new Proxy(Object.create(null), {
  get(target, key) {
    const prop = APP_PROCESS_MODE[key];
    if (prop) {
      const filepath = generateFilePath(
        prop,
        EntryFilename.Main
      );
      return filepath;
    }
    return undefined;
  }
});

/* ***** ***** ***** ***** 主进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 预加载进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 渲染进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 配置组合 ***** ***** ***** ***** */
function getRsConfig(mode) {
  const baseOptions = {
    mode,
    module: {
      rules: [
        LOADER.Js,
        LOADER.TsExclude,
        LOADER.Css,
        LOADER.ImageExclude
      ]
    },
    resolve: {
      /* 别名 */
      alias: {
        '@': DIRECTORY.Source.base
      },

      /* 主入口文件名 */
      mainFiles: ['index', 'main'],

      /* 强制扩展名 */
      enforceExtension: false,

      /* 符号链接 */
      symlinks: false,

      /* 扩展名解析选项 */
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css']
    }
  };
  console.log('BaseConfig', baseOptions);
  const processMode = Object.keys(APP_PROCESS_MODE);
  return processMode.map(key => {
    const options = Object.create(null);
    const type = APP_PROCESS_MODE[key];
    Object.assign(options, baseOptions, {
      entry: _Entry_[key],
      output: {
        /* 输出目录 */
        path: DIRECTORY.App[type]

        /* 输出文件名 - 默认为 main.js  */
        // filename: _FILE.Output.Main
      }
    });
    console.log('ConfigItem:', key, type, DIRECTORY.App[type]);
    return options;
  });
}

module.exports = getRsConfig;
