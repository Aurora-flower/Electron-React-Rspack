/**
 * @file 获取构建配置
 */
const {
  BuildingEnvironment
  // targets
} = require('../common/env');
// const Loader = require('./loader');
const { join } = require('node:path');
const getArgv = require('../utils/argv');
// const { rspack } = require('@rspack/core');
// const { defineConfig } = require('@rsbuild/core');
const BuildTarget = require('../common/build_target');
const { _Directory_, _File_ } = require('../common/project');
// const RefreshPlugin = require('@rspack/plugin-react-refresh');
// const { getHtmlPlugin } = require('./plugins');

/* ***** ***** ***** ***** 项目入口与输出配置 ***** ***** ***** ***** */

/**
 * @summary 项目结构
 */
const Structure = {
  directory: Object.assign({}, _Directory_),
  file: Object.assign({}, _File_)
};

/**
 * @summary 应用进程结构定义
 * @description
 * - `Main`: 主进程
 * - `Preload`: 预加载进程
 * - `Renderer`: 渲染进程
 */
const AppProcessMode = {
  electron: 'electron',
  preload: 'preload',
  renderer: 'renderer'
};

const EntryFilename = {
  Main: 'index.ts',
  Vendor: 'vendor.ts'
};

function generateFilePath(type, filename) {
  return join(Structure.directory.Source[type], filename);
}

/**
 * @summary 构建入口
 */
const Entry = new Proxy(Object.create(null), {
  get(target, key) {
    const prop = AppProcessMode[key];
    if (!prop) {
      return undefined;
    }
    const entry = {
      index: {
        /* 入口模块的路径, import 属性可以设置多个路径 */
        import: generateFilePath(key, EntryFilename.Main),

        /* runtime 属性用于设置运行时 chunk 的名称 */
        runtime: key
      }
    };
    return key === 'renderer'
      ? {
          ...entry,
          vendor: generateFilePath(key, EntryFilename.Vendor)
          // polyfill: join(Structure.directory[prop], 'polyfill.ts'),
        }
      : entry;
  }
});

/* ***** ***** ***** ***** 配置组合 ***** ***** ***** ***** */
/* 公共配置 */
const baseExtensions = [
  /* ... 等价于 Rspack 内置的默认扩展名配置 */
  '...'
  // '.js',
  // '.ts',
  // '.json'
];

function getPlugins(_type, _isDev) {
  // const isRenderer = type === AppProcessMode.renderer;

  const plugins = [
    /* 启用 React Refresh */
    // isRenderer && getHtmlPlugin(),
    /* 启用 CSS 模块化 */
    // new rspack.CssMinimizerRspackPlugin({
    //   minimizerOptions: { targets }
    // })
    // isDev ? new RefreshPlugin() : null
  ];

  return plugins.filter(Boolean);
}

/**
 * @summary 单个配置
 */
function signleConfig(mode, type) {
  /* 是否开发环境 */
  const isDev = mode === BuildingEnvironment.Dev;

  /* 是否渲染进程 */
  const isRenderer = type === AppProcessMode.renderer;

  /* 基础 Loader */
  const baseLoader = [
    {
      with: { type: 'url' },
      type: 'asset/resource'
    },
    {
      test: /\.ts$/,
      exclude: [/node_modules/],
      loader: 'builtin:swc-loader',
      options: {
        jsc: {
          experimental: {
            keepImportAttributes: true
          },
          parser: {
            syntax: 'typescript'
          }
        }
      },
      type: 'javascript/auto'
    }

    /* Loader.js, Loader.ts, Loader.json*/
    // Loader.react(isDev)
  ];

  const options = {
    mode,
    entry: Entry[type],
    target: BuildTarget[type],
    output: {
      /* 输出目录 */
      path: Structure.directory.App[type],

      /* 输出文件名(格式) - 默认为 main.js */
      filename:
        type == AppProcessMode.Renderer
          ? '[name].[contenthash].js'
          : '[name].js',

      /* 清除原输出 */
      clean: true
    },
    resolve: {
      /* 模块解析规则 */
      extensions: baseExtensions,
      /* 别名 */
      alias: {
        '@': Structure.directory.Source.base,
        '@typing': Structure.directory.Typing,
        '@public': Structure.directory.Public.base
      }
    },
    stats: {
      /* 显示错误细节 */
      errorDetails: true,
      /* 开启模块跟踪 */
      modules: true,
      moduleTrace: true
    },
    externals: {
      /* 忽略外部依赖 */
      // electron: 'commonjs2 electron'
      // canvas: 'commonjs2 canvas'
    },
    plugins: getPlugins(type, isDev),
    module: {
      rules: baseLoader
    },
    optimization: {
      // minimizer: [
      //   new rspack.SwcJsMinimizerRspackPlugin(),
      //   new rspack.LightningCssMinimizerRspackPlugin({
      //     minimizerOptions: { targets }
      //   })
      // ]
    }
    // experiments: {
    //   css: true
    // }
  };

  if (isRenderer) {
    /* 注意📢：对主进程、预加载进程可能有影响；当启用路由时，需要设置 publicPath */
    options.output.publicPath = '/';

    /* 默认扩展名补充  */
    options.resolve.extensions = baseExtensions.concat(
      ...['.css', '.jsx', '.tsx']
    );
  }

  return options;
}

/**
 * @summary 获取 rspack 构建配置
 */
function getConfig() {
  // ==================== 获取参数 ====================
  /* 获取命令行参数 */
  const args = getArgv();

  /* 是否开发环境 - args.mode | process.env.NODE_ENV */
  // const isDev = process.env.NODE_ENV === BuildingEnvironment.Dev;

  /* 获取构建环境 */
  const mode = args.mode || BuildingEnvironment.Dev;

  console.log('getConfig...', args, mode);
  const flatConfig = [];
  for (const key in AppProcessMode) {
    if (
      Object.prototype.hasOwnProperty.call(AppProcessMode, key)
    ) {
      const type = AppProcessMode[key];
      const config = signleConfig(mode, type);
      flatConfig.push(config);
      console.log('SignleConfig...', type, config);
      break;
    }
  }
  return flatConfig;
}

module.exports = getConfig;
