/**
 * @file loader 配置
 * @description
 * Loader 用于模块源代码的转换。它们被编写为函数，接收源代码作为参数，并返回转换后的代码。
 */
// const AssetModuleType = require('../common/asset_module');

const { targets } = require('../common/env');

/**
 * @summary SVG 图片资源
 */
const svg = () => ({
  test: /\.svg$/,
  type: 'asset'
});

/**
 * @summary React 配置
 * @param {boolean} isDev 是否开发环境
 */
const react = isDev => ({
  test: /\.(jsx?|tsx?)$/,
  use: [
    {
      /* 使用 SWC 转译器支持 JSX/TSX */
      loader: 'builtin:swc-loader',
      // exclude: [/node_modules/],
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true // 新增装饰器支持
          },
          transform: {
            react: {
              runtime: 'automatic',
              development: isDev,

              /* 开启通用的 react 转换支持 */
              refresh: isDev
            },

            // 新增类型剥离配置
            hidden: {
              jest: false // 禁用jest模式
            }
          }
        },
        parser: {
          syntax: 'ecmascript',
          jsx: true
        },
        env: { targets }
      }
    }
  ],

  /* 默认为 JavaScript 模块，需要设置为 auto */
  type: 'javascript/auto'
});

const Loader = {
  /* 图片资源 */
  svg,

  /* 语言和框架 */
  react
};

module.exports = Loader;
