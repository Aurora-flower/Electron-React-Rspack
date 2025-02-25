/**
 *@summary 获取目录与文件结构
 */
const { join } = require('node:path');

/**
 * @summary 获取当前工作目录
 */
const CWD = process.cwd();

/* ***** ***** ***** ***** 目录结构 ***** ***** ***** ***** */

/**
 * @summary 目录结构
 */
const DirectoryStructure = {
  /* 打包输出总目录 */
  App: 'app',

  /* 配置文件目录 */
  Config: '.config',

  /* 核心环境与扩展目录  */
  Core: 'core',

  /* 文档与模板、生成文件目录 */
  Gen: 'gen',

  /* 公共文件目录 */
  Public: 'public',

  /* 源文件目录 */
  Source: 'source'
};

function getAppStructure(baseUrl) {
  return {
    base: baseUrl,
    electron: join(baseUrl, 'electron'),
    renderer: join(baseUrl, 'public'),
    preload: join(baseUrl, 'preload')
  };
}

function getSourceStructure(baseUrl) {
  return {
    base: baseUrl,
    common: join(baseUrl, 'common'),
    electron: join(baseUrl, 'electron'),
    preload: join(baseUrl, 'preload'),
    renderer: join(baseUrl, 'src'),
    static: join(baseUrl, 'static'),
    types: join(baseUrl, 'types')
  };
}

function getGenStructure(baseUrl) {
  return {
    base: baseUrl,
    template: join(baseUrl, 'template')
  };
}

function getPublicStructure(baseUrl) {
  return {
    base: baseUrl,
    pages: join(baseUrl, 'pages')
  };
}

const _Directory_ = new Proxy(DirectoryStructure, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const baseUrl = join(CWD, target[key]);
    if (key === 'App') {
      return getAppStructure(baseUrl);
    } else if (key === 'Source') {
      return getSourceStructure(baseUrl);
    } else if (key === 'Gen') {
      return getGenStructure(baseUrl);
    } else if (key === 'Public') {
      return getPublicStructure(baseUrl);
    } else {
      return baseUrl;
    }
  }
});

/* ***** ***** ***** ***** 文件结构 ***** ***** ***** ***** */

const FileStructure = {
  Env: '.env',
  DevEnv: '.env.dev',
  Page: 'index.html',
  ProdEnv: '.env.prod',
  Favicon: 'favicon.ico',
  Package: 'package.json'
};

function getFileTrend(form, to, name) {
  return {
    from: join(form, name),
    to: to && join(to, name)
  };
}

const _File_ = new Proxy(FileStructure, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const name = target[key];
    if (key.indexOf('Env') > -1) {
      return getFileTrend(_Directory_.Config, '', name);
    } else if (key === 'Package') {
      return getFileTrend(CWD, _Directory_.Gen.template, name);
    } else if (['Page', 'Favicon'].includes(key)) {
      return getFileTrend(
        _Directory_.Public.base,
        _Directory_.App.renderer,
        name
      );
    }
  }
});

// function getProjectStructure() {
//   console.log(Object.apply({}, _File_));
//   const structure = {
//     _File_: Object.apply({}, _File_),
//     _Directory_: Object.apply({}, _Directory_)
//   };
//   return structure;
// }

module.exports = {
  _Directory_,
  _File_
};
