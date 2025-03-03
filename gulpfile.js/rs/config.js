/**
 * @file 获取构建配置
 */
const Loader = require('./loader');
const { join } = require('node:path');
const { rspack } = require('@rspack/core');
// const { defineConfig } = require('@rsbuild/core');
const BuildTarget = require('../common/build_target');
const { BuildingEnvironment } = require('../common/env');
const { _Directory_, _File_ } = require('../common/project');
const RefreshPlugin = require('@rspack/plugin-react-refresh');
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

/**
 * @summary 入口文件名
 */
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
    const filename = generateFilePath(key, EntryFilename.Main);
    const entry = {
      [key == AppProcessMode.electron ? 'main' : 'index']: {
        /* 入口模块的路径, import 属性可以设置多个路径。多个模块会按照数组定义的顺序依次执行。 */
        import: filename,

        /* runtime 属性用于设置运行时 chunk 的名称 */
        runtime: `${key}_runtime`
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
// const baseExtensions = [
/* ... 等价于 Rspack 内置的默认扩展名配置 */
// '...'
// ];

/**
 * @summary 单个配置
 */
function signleConfig(mode, type) {
  /* 是否开发环境 */
  const isDev = mode === BuildingEnvironment.Dev;

  /* 是否主进程 */
  const isMain = type === AppProcessMode.electron;

  /* 是否渲染进程 */
  const isRenderer = type === AppProcessMode.renderer;

  /* 基础 Loader */
  // const baseLoader = [
  /* Loader.js, Loader.ts, Loader.json*/
  // ];

  // 插件系统
  const plugins = [
    isRenderer &&
      new rspack.HtmlRspackPlugin({
        template: join(
          Structure.directory.Public.base,
          'index.html'
        ),
        inject: 'body',
        meta: {
          // shrink-to-fit=no
          'viewport':
            'width=device-width, initial-scale=1.0,' +
            'maximum-scale=1.0, user-scalable=no',
          /* Content-Security-Policy 策略 */
          'Content-Security-Policy': {
            'http-equiv': 'Content-Security-Policy',
            'content':
              `default-src 'self';` +
              `script-src 'self';` +
              `style-src-elem 'self';` +
              `font-src 'self';` +
              `connect-src 'self' https://api.iconify.design;` +
              `img-src 'self' data:;`
          }
        }
      }),
    isDev && isRenderer && new RefreshPlugin(),
    !isDev && new rspack.SwcJsMinimizerRspackPlugin(),
    isRenderer &&
      new rspack.DefinePlugin({
        global: 'window',
        process: JSON.stringify({
          env: {
            NODE_ENV: isDev ? 'development' : 'production'
          }
        })
      })
  ].filter(Boolean);

  /* loader 配置 */
  const rules = [
    Loader.js(),
    Loader.ts(),
    isRenderer && Loader.react(isDev),
    Loader.svg()
  ].filter(Boolean);

  // 优化配置
  const optimization = {
    // splitChunks: {
    // chunks: 'all'
    // minSize: 20 * 1000,
    // cacheGroups: {
    //   vendors: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name: 'vendors',
    //     priority: -10
    //   }
    // }
    // }
    // minimize: true
    // minimizer: [new rspack.SwcJsMinimizerRspackPlugin()]
  };

  const options = {
    /* 设置构建模式，以启用对应模式下的默认优化策略。 */
    mode,

    /* 设置构建时的详细程度，默认值：'normal' */
    stats: {
      // all: true,
      preset: 'minimal'
      // errorDetails: true
    },

    /* 构建入口，默认值：'./src/index.js' */
    entry: Entry[type],

    /* 构建上下文，设置构建时所依赖的基础路径，默认值：process.cwd() */
    // context: process.cwd(),

    /* 构建目标，指定构建目标环境 */
    target: BuildTarget[type],

    /* 指定 bundles、assets 输出的位置  */
    output: {
      /* 输出目录 */
      path: Structure.directory.App[type],

      /* 输出文件名(格式) - 默认为 main.js */
      filename: '[name].js', // '[name].[contenthash].js'

      /* 非初始块文件的名称 - 默认情况下，使用 [id].js 或从 output.filename 推断出的值（[name] 被替换为 [id] 或在前面加上 [id].）。 */
      // chunkFilename: '[id].js',

      /* 清除原输出 - 在生成产物前，删除输出目录下的所有文件。 */
      clean: true
      // {
      // keep: 'xxx/xxx' // 决定保留的文件
      //}
    },

    /* 开发工具，指定构建时使用的 source map 类型。 */
    devtool: isDev ? 'cheap-source-map' : 'source-map',

    /* 构建插件 */
    plugins,

    /* 解析选项 */
    resolve: {
      /* 模块解析选项 */
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.css'
      ],

      /* 别名 */
      alias: {
        '@': Structure.directory.Source.base
      },

      /* 主入口文件名 */
      mainFiles: ['index', 'main'],

      /* 强制扩展名 */
      enforceExtension: false,

      /* 符号链接 */
      symlinks: false
    },

    /* 优化选项 */
    optimization,

    /* 用于决定如何处理一个项目中不同类型的模块。*/
    module: {
      /* Rule 定义了一个模块的匹配条件以及处理这些模块的行为。 */
      rules
    }
  };

  if (isRenderer) {
    options.module.rules = options.module.rules.concat([
      Loader.css(isRenderer)
    ]);
  }
  if (isMain) {
    // options.optimization = {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // };
  }

  return options;
}

/* ***** ***** ***** ***** 获取方法 ***** ***** ***** ***** */

/**
 * @summary 获取 rspack 构建配置
 */
function getConfig() {
  /* 是否开发环境 - args.mode | process.env.NODE_ENV */
  // const isDev = process.env.NODE_ENV === BuildingEnvironment.Dev;
  const mode = process.env.NODE_ENV;
  console.log('getConfig...', mode);
  const flatConfig = [];
  for (const key in AppProcessMode) {
    if (
      Object.prototype.hasOwnProperty.call(AppProcessMode, key)
    ) {
      const type = AppProcessMode[key];
      const config = signleConfig(mode, type);
      flatConfig.push(config);
      // break;
    }
  }
  return flatConfig;
}

module.exports = getConfig;
