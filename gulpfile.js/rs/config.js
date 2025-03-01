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
const { rspack } = require('@rspack/core');
// const { defineConfig } = require('@rsbuild/core');
const BuildTarget = require('../common/build_target');
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
      index: {
        /* 入口模块的路径, import 属性可以设置多个路径。多个模块会按照数组定义的顺序依次执行。 */
        import: filename,

        /* runtime 属性用于设置运行时 chunk 的名称 */
        runtime: key + '_chunk'
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
 * @summary 解析器选项
 * @description
 * - asset: asset 模块的解析器选项
 * - javascript: javascript 模块的解析器选项
 * - css: CSS 模块的解析器选项
 * - css/auto: css/auto 模块的解析器选项
 * - css/module: css/module 模块的解析器选项
 */
const parser = {
  // asset 模块的解析器选项
  'asset': {
    dataUrlCondition: {
      // 小于等于 8KB 的模块将被 Base64 编码
      maxSize: 1024 * 8
    }
  },
  // javascript 模块的解析器选项
  'javascript': {
    /**
     * @summary 指定动态导入的全局模式
     * @see {@link }
     */
    dynamicImportMode: 'lazy',

    /**
     * @summary 指定动态导入的全局 prefetch
     * @see {@link https://rspack.dev/zh/api/runtime-api/module-methods#webpackprefetch}
     */
    dynamicImportPrefetch: false,

    /**
     * @summary 指定动态导入的全局 preload
     * @see {@link https://rspack.dev/zh/api/runtime-api/module-methods#webpackpreload}
     */
    dynamicImportPreload: false,

    /**
     * @summary 指定 URL 全局模式
     * @description
     * 启用 new URL() 语法解析。
     * 当使用 'relative' 时，webpack 将为 new URL() 语法生成相对的 URL，即结果 URL 中不包含根 URL
     */
    url: true,
    importMeta: true
  },
  // CSS 模块的解析器选项
  'css': {
    namedExports: true
  },
  // css/auto 模块的解析器选项
  'css/auto': {
    namedExports: true
  },
  // css/module 模块的解析器选项
  'css/module': {
    namedExports: true
  }
};

// function getPlugins(_type, _isDev) {
// const isRenderer = type === AppProcessMode.renderer;

// const plugins = [
/* 启用 React Refresh */
// isRenderer && getHtmlPlugin(),
/* 启用 CSS 模块化 */
// new rspack.CssMinimizerRspackPlugin({
//   minimizerOptions: { targets }
// })
// isDev ? new RefreshPlugin() : null
// ];

// return plugins.filter(Boolean);
// }

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
        )
      }),
    isDev && isRenderer && new RefreshPlugin(),
    !isDev && new rspack.SwcJsMinimizerRspackPlugin()
  ].filter(Boolean);

  // 补充 loader 配置
  const rules = [
    // TODO: 拆分为 通用（主进程、渲染进程） | node_modules 专用
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: isDev,
                  refresh: isDev
                }
              }
            }
          }
        }
      ]
    },
    {
      test: /\.js$/,
      include: [/node_modules/],
      use: [
        {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: false // 明确禁用 JSX 转换
              },
              transform: null // 禁用所有转换
            }
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['postcss-loader'],
      // 仅渲染进程需要 CSS 模块化
      ...(isRenderer && {
        oneOf: [
          {
            test: /\.module\.css$/,
            use: [
              {
                loader: 'css-loader',
                options: { modules: true }
              }
            ]
          },
          {
            use: ['css-loader']
          }
        ]
      })
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]'
      }
    }
  ];

  // 优化配置
  const optimization = {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        }
      }
    }
    // minimize: true
    // minimizer: [new rspack.SwcJsMinimizerRspackPlugin()]
  };

  const options = {
    /* 设置构建模式，以启用对应模式下的默认优化策略。 */
    mode,

    /* 构建入口，默认值：'./src/index.js' */
    entry: Entry[type],

    /* 构建上下文，设置构建时所依赖的基础路径，默认值：process.cwd() */
    context: process.cwd(),

    /* 构建目标，指定构建目标环境 */
    target: BuildTarget[type],

    /* 指定 bundles、assets 输出的位置  */
    output: {
      /* 输出目录 */
      path: Structure.directory.App[type],

      /* 输出文件名(格式) - 默认为 main.js */
      // filename:
      //   type == AppProcessMode.Renderer
      //     ? '[name].[contenthash].js'
      //     : '[name].js',

      /* 非初始块文件的名称 - 默认情况下，使用 [id].js 或从 output.filename 推断出的值（[name] 被替换为 [id] 或在前面加上 [id].）。 */
      // chunkFilename: '[id].js',

      /* 清除原输出 - 在生成产物前，删除输出目录下的所有文件。 */
      clean: true
      // {
      // keep: 'xxx/xxx' // 决定保留的文件
      //}
    },

    devtool: isDev ? 'cheap-source-map' : 'source-map',

    plugins,

    optimization,

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
      mainFiles: ['index', 'main'],
      enforceExtension: false,
      symlinks: false
    },

    /* 用于决定如何处理一个项目中不同类型的模块。*/
    module: {
      /* 应用于模块的默认规则。 */
      defaultRules: [
        '...' // 使用 "..." 来引用 Rspack 默认规则
      ],

      /* 配置所有解析器选项 */
      parser,

      /* Rule 定义了一个模块的匹配条件以及处理这些模块的行为。 */
      rules

      /* 用于标识匹配的模块的 layer。可以将一组模块聚合到一个 layer 中，该 layer 随后可以在 split chunks, stats 或 entry options 中使用。 */
      // experiments: { layers: true }
    }
  };

  if (isRenderer) {
    /* 注意📢：对主进程、预加载进程可能有影响；当启用路由时，需要设置 publicPath */
    // options.output.publicPath = '/';
  } else if (isMain) {
    // 在主进程配置中禁用代码分割(禁用破坏性优化)
    // optimization: {
    //   splitChunks: false,
    //   minimize: false,
    //   concatenateModules: false
    // }
    // options.externals = [
    //   { express: 'require("express")' },
    //   { electron: 'require("electron")' },
    //   /^node:/
    // ];

    options.optimization = {
      ...optimization,
      runtimeChunk: 'single'
    };
  }

  return options;
}

/* ***** ***** ***** ***** 获取方法 ***** ***** ***** ***** */

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

  console.log(
    'getConfig...',
    args,
    mode,
    Structure.directory.Source.base
  );
  const flatConfig = [];
  for (const key in AppProcessMode) {
    if (
      Object.prototype.hasOwnProperty.call(AppProcessMode, key)
    ) {
      const type = AppProcessMode[key];
      const config = signleConfig(mode, type);
      flatConfig.push(config);
      console.log('config...', {
        [type]: Entry[type]
      });
      // break;
    }
  }
  return flatConfig;
}

module.exports = getConfig;
