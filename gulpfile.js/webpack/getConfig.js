const {
  getDotenvPlugin,
  getHtmlWebpackPlugin,
  getCopyWebpackPlugin,
  getCssMinimizerPlugin,
  getMiniCssExtractPlugin
} = require('./plugins');
const { Loader } = require('./loader');
const { Devtool } = require('./devtool');
const joinPath = require('../utils/joinpath');
const { WebpakTarget } = require('./webpack-target');
const { BuildingEnvironment } = require('./constant');

/* ***** ***** ***** ***** 目录与文件结构 ***** ***** ***** ***** */

/**
 * @summary 获取当前工作目录
 */
const CWD = process.cwd();

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
    electron: joinPath(baseUrl, 'electron'),
    renderer: joinPath(baseUrl, 'public'),
    preload: joinPath(baseUrl, 'preload')
  };
}

function getSourceStructure(baseUrl) {
  return {
    base: baseUrl,
    common: joinPath(baseUrl, 'common'),
    electron: joinPath(baseUrl, 'electron'),
    preload: joinPath(baseUrl, 'preload'),
    renderer: joinPath(baseUrl, 'src'),
    static: joinPath(baseUrl, 'static'),
    types: joinPath(baseUrl, 'types')
  };
}

function getGenStructure(baseUrl) {
  return {
    base: baseUrl,
    template: joinPath(baseUrl, 'template')
  };
}

function getPublicStructure(baseUrl) {
  return {
    base: baseUrl,
    pages: joinPath(baseUrl, 'pages')
  };
}

const Directory = new Proxy(DirectoryStructure, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const baseUrl = joinPath(CWD, target[key]);
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
    from: joinPath(form, name),
    to: to && joinPath(to, name)
  };
}

const File = new Proxy(FileStructure, {
  get(target, key) {
    if (!(key in target)) {
      return undefined;
    }
    const name = target[key];
    if (key.indexOf('Env') > -1) {
      return getFileTrend(Directory.Config, '', name);
    } else if (key === 'Package') {
      return getFileTrend(CWD, Directory.Gen.template, name);
    } else if (['Page', 'Favicon'].includes(key)) {
      return getFileTrend(
        Directory.Public.base,
        Directory.App.renderer,
        name
      );
    }
  }
});

/* ***** ***** ***** ***** Webpack 构建配置 ***** ***** ***** ***** */

/* 公共配置 */
const baseExtensions = ['.js', '.ts', '.json'];
const baseLoader = [Loader.js, Loader.ts, Loader.json];

/**
 * @summary 获取基础插件配置
 * @param {BuildingEnvironment} mode 构建环境
 */
function getBasePlugins(mode) {
  const envMode = mode || process.env?.NODE_ENV;
  const envFile =
    envMode === BuildingEnvironment.Prod
      ? File.ProdEnv.from
      : File.DevEnv.from;
  return [
    getDotenvPlugin(File.Env.from),
    getDotenvPlugin(envFile)
  ];
}
/**
 * @summary 构建入口
 */
const Entry = {
  Main: {
    main: joinPath(Directory.Source.electron, 'index.ts'),
    vendor: joinPath(Directory.Source.electron, 'vendor.ts')
  },
  Preload: {
    index: joinPath(Directory.Source.preload, 'index.ts')
  },
  Renderer: {
    index: joinPath(Directory.Source.renderer, 'index.ts'),
    vendor: joinPath(Directory.Source.renderer, 'vendor.ts')
  }
};

/**
 * @summary Webpack 别名
 */
const alias = {
  '@': Directory.Source.base,
  '@public': Directory.Public.base
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
  // canvas: 'commonjs2 canvas'
};

/**
 * @summary 应用进程结构定义
 * @description
 * - `Main`: 主进程
 * - `Preload`: 预加载进程
 * - `Renderer`: 渲染进程
 */
const AppProcess = {
  Main: 'electron',
  Preload: 'preload',
  Renderer: 'renderer'
};

/**
 * @summary 构建状态输出
 */
const stats = {
  errorDetails: true
};

/**
 * @summary 获取 Webpack 构建配置
 * @param {BuildingEnvironment} mode 构建环境
 */
function get(type) {
  const mode =
    type || process.env?.NODE_ENV || BuildingEnvironment.Dev;
  console.log('Compile env:', mode);
  const config = Object.entries(AppProcess).map(
    ([key, name]) => {
      const isRenderer = name === AppProcess.Renderer;

      const options = {
        mode,
        stats,
        entry: Entry[key],
        target: WebpakTarget[key],
        output: {
          path: Directory.App[name], // 输出目录
          filename: '[name].js', // '[name].[contenthash].js'
          clean: true
        },
        devtool: Devtool.NosourcesSourceMap,
        resolve: {
          // mainFields: ['browser', 'module', 'main'],
          extensions: baseExtensions,
          alias
        },
        externals,
        module: {
          rules: baseLoader
        },
        optimization,
        plugins: getBasePlugins(mode)
      };

      if (isRenderer) {
        /* 注意📢：对主进程、预加载进程可能有影响；当启用路由时，需要设置 publicPath */
        options.output.publicPath = '/';
        options.resolve.extensions = baseExtensions.concat([
          '.css',
          '.jsx',
          '.tsx'
        ]);
        options.module.rules = baseLoader.concat([
          Loader.css,
          Loader.font
        ]);

        const pluginsExtend = [
          // TODO: 存在问题，会多次对 index.html 文件进行处理
          // - getHtmlWebpackPlugin & getCopyWebpackPlugin
          getCopyWebpackPlugin([
            /* favicon.ico */
            // {
            //   ...File.Favicon,
            //   toType: 'file'
            // },

            /* public */
            {
              from: Directory.Public.pages,
              toType: 'dir',
              to: Directory.App.renderer,
              filter: filePath => {
                if (filePath.indexOf('index.html') > -1) {
                  return false;
                }
                return true;
              }
            }
          ]),
          getHtmlWebpackPlugin({
            template: File.Page.from,
            filename: File.Page.to
          }),
          getMiniCssExtractPlugin(),
          getCssMinimizerPlugin()
        ].filter(Boolean);

        options.plugins.push(...pluginsExtend);
      }

      return options;
    }
  );

  return config;
}

module.exports = get;
