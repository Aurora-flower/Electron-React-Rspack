/**
 * @file Loader 处理配置
 */
const { rspack } = require('@rspack/core');

/* ***** ***** ***** ***** 忽略规则 ***** ***** ***** ***** */
/**
 * @constant {RegExp} NODE_MODULES node_modules 规则
 */
const NODE_MODULES = /node_modules/;

/* ***** ***** ***** ***** Parser ***** ***** ***** ***** */

/**
 * @summary js parser
 */
const JS_PARSER_OPTIONS = {
  loader: 'babel-loader',
  options: {
    /* 预设 */
    presets: [
      '@babel/preset-env',
      '@babel/preset-react' /* 用于处理 react 文件 */,
      '@babel/preset-typescript'
    ]
  }
  // cacheDirectory: true,
  // cacheCompression: false,
  // compact: false
};

/**
 * @summary ts parser
 */
const TS_PARSER_OPTIONS = {
  loader: 'ts-loader',
  options: {
    /**
     * @summary 仅编译，不进行类型检查;
     * @description
     * 当 `transpileOnly: true` 时，需配合 `fork-ts-checker-webpack-plugin` 或其他插件进行类型检查
     */
    transpileOnly: true,
    /* 启用 happypack 优化 - 多进程 */
    happyPackMode: true
  }
};

/* ***** ***** ***** ***** 获取 Loader ***** ***** ***** ***** */

/**
 * @summary 图片文件处理
 * @param {boolean} isExclude 是否排除
 * @param {RegExp} exclude 排除的规则
 * @returns {Object} 返回图片资源的 loader 配置选项
 */
function getImageLoader(
  isExclude = false,
  exclude = NODE_MODULES
) {
  const options = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'images'
        }
      }
    ],
    exclude: isExclude ? exclude : undefined
  };
  return options;
}

/**
 * @summary css 文件处理
 * @param {boolean} isExclude 是否排除
 * @param {RegExp} exclude 排除的规则
 * @returns {Object}  返回 css 文件的 loader 配置选项
 */
function getCssLoader(
  isExclude = false,
  exclude = NODE_MODULES
) {
  const options = {
    test: /\.css$/,
    use: [
      /* 替代 style-loader - rspack 不兼容 MiniCssExtractPlugin */
      rspack.CssExtractRspackPlugin.loader,
      // {
      //   loader: 'style-loader'
      // },
      {
        loader: 'css-loader',
        options: {
          /* 声明需要经过的 loader 数量 */
          // importLoaders: 1,
          /* 启用 happypack 优化 - 多进程 */
          // happyPackMode: true
        }
      },
      {
        loader: 'postcss-loader'
        // options: {
        //   postcssOptions: {
        //     config: './postcss.config.js'
        //   }
        // }
      }
    ],
    exclude: isExclude ? exclude : undefined
  };
  return options;
}

/**
 * @summary js 文件处理
 * @param {boolean} isExclude 是否排除
 * @param {RegExp} exclude 排除的规则
 * @returns {Object} 返回 js 文件的 loader 配置选项
 */
function getJsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.jsx?$/,
    use: [JS_PARSER_OPTIONS],
    exclude: isExclude ? exclude : undefined
  };
  return options;
}

/**
 * @summary ts 文件处理
 * @param {boolean} isExclude 是否排除
 * @param {RegExp} exclude 排除的规则
 * @returns {Object} 返回 ts 文件的 loader 配置选项
 */
function getTsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.tsx?$/,
    use: [JS_PARSER_OPTIONS, TS_PARSER_OPTIONS],
    exclude: isExclude ? exclude : undefined
  };
  return options;
}

/* ***** ***** ***** ***** 导出 Loader ***** ***** ***** ***** */

const LOADER = {
  Js: getJsLoader(),
  JsExclude: getJsLoader(true),
  Ts: getTsLoader(),
  TsExclude: getTsLoader(true),
  Css: getCssLoader(),
  CssExclude: getCssLoader(true),
  Image: getImageLoader(),
  ImageExclude: getImageLoader(true)
};

module.exports = LOADER;
