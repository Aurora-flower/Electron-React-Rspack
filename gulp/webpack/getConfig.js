const {
  AppProcess,
  BuildingEnvironment
} = require('./constant');
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
 * @summary 获取 Webpack 构建配置
 * @param {BuildingEnvironment} mode 构建环境
 */
function get(mode = BuildingEnvironment.Dev) {
  const baseExtensions = ['.js', '.ts', '.json'];
  const Config = Object.values(AppProcess).map(name => {
    const options = {
      mode:
        mode || process.env?.NODE_ENV || BuildingEnvironment.Dev,
      target: WebpakTarget[name],
      stats: {
        errorDetails: true
      },
      entry: Entry[name],
      output: {
        publicPath: '/', // 对主进程、预加载进程可能有影响
        filename: '[name].js', // '[name].[contenthash].js'
        clean: true
      },
      devtool: Devtool.NosourcesSourceMap,
      resolve: {
        // mainFields: ['browser', 'module', 'main'],
        extensions:
          name === AppProcess.Renderer
            ? ['.jsx', '.tsx', ...baseExtensions]
            : baseExtensions,
        alias: {
          '@/*': Path.Source.base,
          '@type/*': Path.Types
        }
      },
      externals: {},
      module: {
        rules: []
      },
      optimization: {},
      plugins: []
    };

    // name === AppProcess.Renderer &&
    //   (options.output.publicPath = '/');

    return options;
  });

  return Config;
}

module.exports = get;
