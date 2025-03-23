/**
 * @file 获取项目构建配置
 */
const LOADER = require('./loader');
const PLUGINS = require('./plugins');
const { join } = require('node:path');
const ENV = require('../../common/env');
// const { rspack } = require('@rspack/core');
const {
  getFileStructure,
  getDirectoryStructure
} = require('../../common/project_structure');
const DEVTOOL = require('../../common/devtool');
const BUILD_TARGET = require('../../common/build_target');
const { APP_PROCESS_MODE } = require('../../common/const');

const FILE = getFileStructure();
const DIRECTORY = getDirectoryStructure();

/* ***** ***** ***** ***** 项目入口与输出配置 ***** ***** ***** ***** */
/**
 * @constant ENTRY_FILENAME 入口文件名
 */
const ENTRY_FILENAME = {
  Main: 'index.ts',
  Vendor: 'vendor.ts'
};

/**
 * @summary 生成文件路径
 * @param {string} type - 文件类型
 * @param {string} filename - 文件名
 * @returns {string} - 文件路径
 */
function generateFilePath(type, filename) {
  return join(DIRECTORY.Source[type] || '', filename);
}

/* ***** ***** ***** ***** 主进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 预加载进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 渲染进程相关 ***** ***** ***** ***** */

/* ***** ***** ***** ***** 配置组合 ***** ***** ***** ***** */
/**
 * @summary 获取单构建配置
 * @param {string} mode 构建环境
 * @param {string} key 构建环境
 * @param {string} type 进程类型
 * @returns {*} 单构建配置
 */
function getSignleConfig(mode, key, type) {
  /* 是否开发环境 */
  const isDev = mode === ENV.Dev;
  console.log('ISDEV', isDev);

  /* 是否主进程 */
  const isMain = type === APP_PROCESS_MODE.Electron;

  /* 是否渲染进程 */
  const isRenderer = type === APP_PROCESS_MODE.Renderer;

  /* 基础配置 */
  const baseOptions = {
    mode,
    module: {
      rules: [
        LOADER.JsExclude,
        LOADER.TsExclude,
        LOADER.Css,
        LOADER.Image
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

      /* fallback 配置：将 Node.js 核心模块指向浏览器兼容的实现 */
      // fallback: {
      //   path: require.resolve('path-browserify'), // 处理 path 模块
      //   fs: false, // 禁用文件系统模块
      //   crypto: require.resolve('crypto-browserify') // 其他需要处理的模块
      // }
    },
    plugins: [
      // 添加 Node polyfill 插件（所有配置共享）
      // new NodePolyfillPlugin()
      // 独立进程做类型检查
      // new ForkTsCheckerWebpackPlugin()

      /* 添加 CSS 提取插件 */
      PLUGINS.CssExtract()
    ]
  };

  const emptyObject = Object.create(null);
  const options = Object.assign(emptyObject, baseOptions, {
    target: BUILD_TARGET[key],
    entry: {
      [type]: {
        /* 入口模块的路径, import 属性可以设置多个路径。多个模块会按照数组定义的顺序依次执行。 */
        import: generateFilePath(type, ENTRY_FILENAME.Main)

        /* runtime 属性用于设置运行时 chunk 的名称 */
        // runtime: `${key}_runtime`
      }
    },
    output: {
      /* 输出目录 */
      path: DIRECTORY.App[type],

      /* 输出文件名 - 默认为 main.js  */
      filename: `${isMain ? 'main' : 'index'}.js`,

      /* 清除原输出 - 在生成产物前，删除输出目录下的所有文件。 */
      clean: true
    },
    devtool: DEVTOOL.CheapModuleSourceMap
  });

  if (isRenderer) {
    /**
     * 注意📢: 对主进程、预加载进程可能有影响; 当启用路由时，需要设置 publicPath;
     * TODO: 当主进程使用 loadFile 加载文件时，关闭此处
     */
    options.output.publicPath = '/';

    /* 增加 HTML 相关插件 */
    options.plugins = options.plugins.concat([
      /* 添加 HTML 插件 */
      PLUGINS.Html(FILE.Page.from)
    ]);
  }

  return options;
}

/**
 * @summary 获取 Rspack 构建配置
 * @param {string} mode 构建环境
 * @returns {*} Rspack 扁平化构建配置
 */
function getRsConfig(mode) {
  const flatConfig = [];
  for (const key in APP_PROCESS_MODE) {
    if (
      Object.prototype.hasOwnProperty.call(APP_PROCESS_MODE, key)
    ) {
      const type = APP_PROCESS_MODE[key];
      const config = getSignleConfig(mode, key, type);
      flatConfig.push(config);
    }
  }
  return flatConfig;
}

module.exports = getRsConfig;
