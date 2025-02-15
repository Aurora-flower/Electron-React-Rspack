// const { rimraf } = require('rimraf');
const Dotenv = require('dotenv-webpack');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 获取 HtmlWebpackPlugin 实例
 * @description 用于生成 HTML 文件
 * @returns {HtmlWebpackPlugin}
 */
function getHtmlWebpackPlugin({ template, filename }) {
  try {
    const inject = 'body'; // boolean | 'body' | 'head'
    const HtmlWebpackPluginOption = {
      inject,
      title: '花楹一间',
      template,
      filename,
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
    };
    return new HtmlWebpackPlugin(HtmlWebpackPluginOption);
  } catch (error) {
    console.log('HtmlWebpackPlugin error:', error?.message);
    return null;
  }
}

/**
 * 获取 MiniCssExtractPlugin 实例
 * @description 提取 CSS 到单独的文件
 * @returns {MiniCssExtractPlugin}
 */
function getMiniCssExtractPlugin() {
  try {
    const MiniCssExtractPluginOption = {
      filename: 'css/[name].[contenthash].css', // 输出的 CSS 文件名
      chunkFilename: 'css/[id].[contenthash].css' // chunk 的 CSS 文件名
    };
    return new MiniCssExtractPlugin(MiniCssExtractPluginOption);
  } catch (error) {
    console.log('MiniCssExtractPlugin error:', error?.message);
    return null;
  }
}

/**
 * 获取 CssMinimizerPlugin 实例
 * @description 压缩 CSS
 * @returns {CssMinimizerPlugin}
 */
function getCssMinimizerPlugin() {
  try {
    const CssMinimizerPluginOption = {
      minimizerOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true }
          }
        ]
      }
    };
    return new CssMinimizerPlugin(CssMinimizerPluginOption);
  } catch (error) {
    console.log('CssMinimizerPlugin error:', error?.message);
    return null;
  }
}

/**
 * 获取 CopyWebpackPlugin 实例
 * @description 用于复制文件
 * @param patterns 模式
 * @param option 配置选项
 * @returns  {CopyWebpackPlugin}
 */
function getCopyWebpackPlugin(patterns, option) {
  try {
    const CopyPluginOption = {
      patterns
    };
    if (option) {
      CopyPluginOption.options = option;
    }
    return new CopyWebpackPlugin(CopyPluginOption);
  } catch (error) {
    console.log('CopyWebpackPlugin error:', error?.message);
    return null;
  }
}

/**
 * 获取 DotenvPlugin 实例
 * @description 用于加载 .env 文件
 * @param {string} envpath - .env 文件路径
 * @param {Record<string, unknown>} option - 配置项
 * @returns {DotenvPlugin}
 */
function getDotenvPlugin(envpath, option = {}) {
  try {
    const DefaultOption = {
      safe: true,
      systemvars: true,
      silent: true
    };
    const MergedOption = Object.assign(DefaultOption, option);
    const DotenvPluginOption = {
      path: envpath,
      ...MergedOption
    };
    return new Dotenv(DotenvPluginOption);
  } catch (error) {
    console.log('DotenvPlugin error:', error?.message);
    return null;
  }
}

function getBundleAnalyzerPlugin() {
  try {
    const BundleAnalyzerPluginOption = {
      /**
       * @summary 分析展示模式
       * @description
       * 可选值: `server` | `static` | `disabled`
       * - `server` 模式会在本地 http 服务器上启动一个展示页面；
       * - `static` 模式会把报告放在一个静态的 html 文件中；
       * - `disabled` 模式会直接禁用该插件；在此模式下，可以使用这个插件来将`generateStatsFile`设置为`true`来生成 Webpack Stats JSON 文件。
       */
      analyzerMode: 'static',

      /**
       * @summary 在 `server` 模式下, 使用的主机启动 HTTP 服务器
       */
      // analyzerHost: '127.0.0.1',

      /**
       * @summary 在 `server` 模式下, 使用的端口启动 HTTP 服务器。
       */
      // analyzerPort: 8888,

      /**
       * @summary 在 `static` 模式下, 生成的报告文件的位置，相对于输出目录
       */
      reportFilename: 'report.html',

      /**
       * @summary 在 `server` 模式下, 是否自动打开浏览器
       */
      openAnalyzer: false,

      /**
       * @summary 模块大小默认显示在报告中
       * @description 可选值：`stat` | `parsed` | `gzip`
       */
      // defaultSizes: 'parsed',

      /**
       * @summary 是否在输出目录生成 Webpack Stats JSON 文件
       */
      generateStatsFile: true,

      /**
       * @summary Webpack Stats JSON 文件生成的位置，相对于输出目录
       */
      statsFilename: 'stats.json'

      /**
       * @summary Stats.toJson 的选项
       */
      // statsOptions: {}

      /**
       * @summary 日志级别
       * @description 可选值：`info` | `warn` | `error` | `silent`
       */
      // logLevel: 'info'
    };
    return new BundleAnalyzerPlugin(BundleAnalyzerPluginOption);
  } catch (error) {
    console.log('BundleAnalyzerPlugin error:', error?.message);
    return null;
  }
}

module.exports = {
  getDotenvPlugin,
  getHtmlWebpackPlugin,
  getCopyWebpackPlugin,
  getCssMinimizerPlugin,
  getBundleAnalyzerPlugin,
  getMiniCssExtractPlugin
};
