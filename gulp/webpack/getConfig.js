const {
  AppProcess,
  BuildingEnvironment
} = require('./constant');
const { Loader } = require('./loader');
const { Devtool } = require('./devtool');
const joinPath = require('../utils/joinpath');
const { WebpakTarget } = require('./webpack-target');

/**
 * @summary 获取当前工作目录
 */
const CWD = process.cwd();

/**
 * @summary 定义输入、输出目录与文件路径
 */
const Path = new Proxy(
  {
    /* ********************* Folder Path ********************* */
    /* 打包输出位置 */
    App: 'app',

    /* 类型声明文件目录 */
    Types: 'types',

    /* 源文件目录 */
    Source: 'source',

    /* 配置文件目录 */
    Config: '.config',

    /* 主进程、预加载进程代码存放位置 */
    Main: 'electron',

    /* 渲染进程代码存放位置 */
    Renderer: 'renderer'

    /* ********************* File Path ********************* */
  },
  {
    get(target, key) {
      const flag = key in target;
      if (!flag) return undefined;
      if ([AppProcess.Main, AppProcess.Renderer].includes(key)) {
        return joinPath(CWD, target.App, target[key]);
      }
      const folder = joinPath(CWD, target[key]);
      if (['Source'].includes(key)) {
        return {
          base: folder,
          electron: joinPath(folder, 'electron'),
          preload: joinPath(folder, 'preload'),
          server: joinPath(folder, 'server'),
          renderer: joinPath(folder, 'src')
        };
      }
      return folder;
    }
  }
);

/**
 * @summary 构建入口
 */
const Entry = {
  Main: {
    main: joinPath(Path.Source.electron, 'index.ts')
  },
  Preload: {
    preload: joinPath(Path.Source.preload, 'index.ts')
  },
  Renderer: {
    index: joinPath(Path.Source.renderer, 'index.ts'),
    vendor: joinPath(Path.Source.renderer, 'vendor.ts')
  }
};

/**
 * @summary Webpack 别名
 */
const alias = {
  '@': Path.Source.base,
  '@type': Path.Types
};

/**
 * @summary Webpack 优化配置
 * @see {@link https://www.webpackjs.com/configuration/optimization/ Webpack 官方文档-optimization}
 */
const optimization = {
  // runtimeChunk: 'single',
  // splitChunks: {
  //   chunks: 'all',
  //   maxInitialRequests: Infinity,
  //   minSize: 0,
  //   cacheGroups: {
  //     vendors: {
  //       test: /[\\/]node_modules[\\/]/,
  //       name: 'vendors',
  //       chunks: 'all'
  //     }
  //   }
  // }
  /* 压缩代码 */
  minimize: true
};

/**
 * @summary 配置外部依赖
 * 表示排除的依赖项，指定的依赖不会被打包, node 模块默认不会被打包；
 */
const externals = {
  // electron: 'commonjs2 electron'
};

/**
 * @summary 获取 Webpack 构建配置
 * @param {BuildingEnvironment} mode 构建环境
 */
function get(mode = BuildingEnvironment.Dev) {
  const baseExtensions = ['.js', '.ts', '.json'];
  const baseScriptLoader = [Loader.js, Loader.ts];
  const Config = Object.values(AppProcess).map(name => {
    const isRenderer = name === AppProcess.Renderer;
    const options = {
      mode:
        mode || process.env?.NODE_ENV || BuildingEnvironment.Dev,
      target: WebpakTarget[name],
      stats: {
        errorDetails: true
      },
      entry: Entry[name],
      output: {
        path: Path[name], // 输出目录
        filename: '[name].js', // '[name].[contenthash].js'
        clean: true
      },
      devtool: Devtool.NosourcesSourceMap,
      resolve: {
        // mainFields: ['browser', 'module', 'main'],
        extensions: isRenderer
          ? ['.jsx', '.tsx', ...baseExtensions]
          : baseExtensions,
        alias
      },
      externals,
      module: {
        rules: isRenderer
          ? [Loader.css].concat(baseScriptLoader)
          : baseScriptLoader
      },
      optimization,
      plugins: []
    };

    isRenderer &&
      // 对主进程、预加载进程可能有影响
      (options.output.publicPath = '/');

    return options;
  });

  console.log(alias);

  return Config;
}

module.exports = get;
