/**
 * @file 目录与文件结构定义
 */
const { join } = require('node:path');

// process.chdir('/Users') // 修改当前工作目录

/**
 * @constant CWD 获取当前工作目录
 */
const CWD = process.cwd();

/**
 * @constant APP 应用目录
 * @constant SOURCE 源码目录
 * @constant PUBLIC 公共文件目录
 */
const APP = 'App';
const SOURCE = 'Source';
const PUBLIC = 'Public';

/* ***** ***** ***** ***** 目录结构 ***** ***** ***** ***** */

/**
 * @constant DIRECTORY_STRUCTURE 目录结构 (Directory Structure)
 */
const DIRECTORY_STRUCTURE = {
  /* 打包输出总目录 */
  [APP]: 'app',

  /* 公共文件目录 */
  [PUBLIC]: 'public',

  /* 源文件目录 */
  [SOURCE]: 'source',

  /* 配置文件目录 */
  Config: '.config'

  /* 核心环境与扩展目录  */
  // Core: 'core',

  /* 文档与模板、生成文件目录 */
  // Gen: 'gen',

  /* 类型文件目录 */
  // Typing: 'types'
};

/**
 * @summary 获取 App 输出目录下的结构
 * @param {string} baseUrl 输出目录路径
 * @returns {object} App 目录结构
 */
function getAppStructure(baseUrl) {
  return {
    base: baseUrl,

    /* 主进程输出目录 */
    main: join(baseUrl, 'electron'),

    /* 渲染进程输出目录 */
    renderer: join(baseUrl, 'public'),

    /* 预加载进程输出目录 */
    preload: join(baseUrl, 'preload')
  };
}

/**
 * @summary 获取源文件目录下的结构
 * @param {string} baseUrl 源文件目录路径
 * @returns {object} Source (源码)目录结构
 */
function getSourceStructure(baseUrl) {
  return {
    base: baseUrl,

    /* 公用文件目录（主、预加载、渲染进程均可使用的模块） */
    common: join(baseUrl, 'common'),

    /* 主进程源码目录 */
    main: join(baseUrl, 'electron'),

    /* 预加载进程源码目录 */
    preload: join(baseUrl, 'preload'),

    /* 渲染进程源码目录 */
    renderer: join(baseUrl, 'src')
  };
}

/**
 * @summary 获取公共文件目录下的结构
 * @param {string} baseUrl 公共文件目录路径
 * @returns {object} Public 目录结构
 */
function getPublicStructure(baseUrl) {
  return {
    base: baseUrl,

    /* 页面文件目录 */
    pages: join(baseUrl, 'pages')
  };
}

/**
 * @constant _Directory_  目录结构代理
 */
const _Directory_ = new Proxy(DIRECTORY_STRUCTURE, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const baseUrl = join(CWD, target[key]);
    if (key === APP) {
      return getAppStructure(baseUrl);
    } else if (key === SOURCE) {
      return getSourceStructure(baseUrl);
    } else if (key === PUBLIC) {
      return getPublicStructure(baseUrl);
    } else {
      return baseUrl;
    }
  }
});

/* ***** ***** ***** ***** 文件结构 ***** ***** ***** ***** */

/**
 * @constant FILE_STRUCTURE  文件结构 (File Structure)
 */
const FILE_STRUCTURE = {
  /* 环境变量配置文件 */
  Env: '.env',
  DevEnv: '.env.dev',
  ProdEnv: '.env.prod',

  /* 主入口文件 */
  Page: 'index.html',

  /* 图标 */
  Favicon: 'favicon.ico'

  /* 项目配置文件 */
  // Package: 'package.json'
};

/**
 * @summary 获取文件路径
 * @param {string} form 源文件路径
 * @param {string} name 文件名
 * @param {string} to 目标文件路径
 * @returns {object} 文件原路径与目标路径
 */
function getFileTrend(form, name, to = '') {
  return {
    from: join(form, name),
    to: to && join(to, name)
  };
}

/**
 * @constant _File_ 文件结构代理
 */
const _File_ = new Proxy(FILE_STRUCTURE, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const name = target[key];
    if (key.indexOf('Env') > -1) {
      return getFileTrend(_Directory_.Config, name);
    } else if (['Page', 'Favicon'].includes(key)) {
      return getFileTrend(
        _Directory_.Public.base,
        name,
        _Directory_.App.renderer
      );
    }
  }
});

/* ***** ***** ***** ***** 获取与导出 ***** ***** ***** ***** */

/**
 * @summary 获取目录结构
 * @returns {object} 目录结构对象
 */
function getDirectoryStructure() {
  const emptyObject = Object.create(null);
  return Object.assign(emptyObject, _Directory_);
}

/**
 * @summary 获取文件结构
 * @returns {object} 文件结构对象
 */
function getFileStructure() {
  const emptyObject = Object.create(null);
  return Object.assign(emptyObject, _File_);
}

module.exports = {
  CWD,
  _Directory_,
  _File_,
  getFileStructure,
  getDirectoryStructure
};
