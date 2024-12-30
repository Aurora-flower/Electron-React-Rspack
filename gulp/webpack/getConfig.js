const {
  AppProcess,
  BuildingEnvironment
} = require('./constant');
const { Loader } = require('./loader');
const { Devtool } = require('./devtool');
const joinPath = require('../utils/joinpath');
const { getDotenvPlugin } = require('./plugins');
const { WebpakTarget } = require('./webpack-target');

/**
 * @summary 获取当前工作目录
 */
const CWD = process.cwd();

/**
 * @summary 定义输入、输出目录与文件路径
 */
const FolderPath = new Proxy(
  {
    /* 打包输出位置 */
    App: 'app',

    /* 静态文件目录 */
    Public: 'public',

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
      if (['Public'].includes(key)) {
        const assets = joinPath(folder, 'assets');
        return {
          base: folder,
          assets,
          fonts: joinPath(assets, 'fonts'),
          atlas: joinPath(folder, 'atlas'),
          images: joinPath(assets, 'images'),
          styles: joinPath(folder, 'styles')
        };
      }
      return folder;
    }
  }
);

const FilePath = new Proxy(
  {
    Env: '.env',
    Page: 'index.html',
    Favicon: 'favicon.ico'
  },
  {
    get(target, key) {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return undefined;
      }

      if (['Env'].includes(key)) {
        return {
          base: joinPath(FolderPath.Config, target[key]),
          private: joinPath(FolderPath.Config, '.private.env')
        };
      } else if (['Config'].includes(key)) {
        joinPath(FolderPath.Public.base, target[key]);
      }
      return target[key];
    }
  }
);

/**
 * @summary 构建入口
 */
const Entry = {
  Main: {
    main: joinPath(FolderPath.Source.electron, 'index.ts')
  },
  Preload: {
    preload: joinPath(FolderPath.Source.preload, 'index.ts')
  },
  Renderer: {
    index: joinPath(FolderPath.Source.renderer, 'index.ts'),
    vendor: joinPath(FolderPath.Source.renderer, 'vendor.ts')
  }
};

/**
 * @summary Webpack 别名
 */
const alias = {
  '@': FolderPath.Source.base,
  '@type': FolderPath.Types
};

/**
 * @summary Webpack 优化配置
 * @see {@link https://www.webpackjs.com/configuration/optimization/}
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
        path: FolderPath[name], // 输出目录
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
      plugins: [getDotenvPlugin(FilePath.Env.base)]
    };

    if (isRenderer) {
      // 对主进程、预加载进程可能有影响
      options.output.publicPath = '/';
    }

    return options;
  });

  console.log(alias);

  return Config;
}

module.exports = get;
