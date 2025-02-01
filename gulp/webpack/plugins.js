// const { rimraf } = require('rimraf');
const Dotenv = require('dotenv-webpack');
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
}

/**
 * 获取 MiniCssExtractPlugin 实例
 * @description 提取 CSS 到单独的文件
 * @returns {MiniCssExtractPlugin}
 */
function getMiniCssExtractPlugin() {
  const MiniCssExtractPluginOption = {
    filename: 'css/[name].[contenthash].css', // 输出的 CSS 文件名
    chunkFilename: 'css/[id].[contenthash].css' // chunk 的 CSS 文件名
  };
  return new MiniCssExtractPlugin(MiniCssExtractPluginOption);
}

/**
 * 获取 CssMinimizerPlugin 实例
 * @description 压缩 CSS
 * @returns {CssMinimizerPlugin}
 */
function getCssMinimizerPlugin() {
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
}

/**
 * 获取 CopyWebpackPlugin 实例
 * @description 用于复制文件
 * @param patterns 模式
 * @param option 配置选项
 * @returns  {CopyWebpackPlugin}
 */
function getCopyWebpackPlugin(patterns, option) {
  const CopyPluginOption = {
    patterns
  };
  if (option) {
    CopyPluginOption.options = option;
  }
  return new CopyWebpackPlugin(CopyPluginOption);
}

/**
 * 获取 DotenvPlugin 实例
 * @description 用于加载 .env 文件
 * @param {string} envpath - .env 文件路径
 * @param {Record<string, unknown>} option - 配置项
 * @returns {DotenvPlugin}
 */
function getDotenvPlugin(envpath, option = {}) {
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
}

module.exports = {
  getDotenvPlugin,
  getHtmlWebpackPlugin,
  getCopyWebpackPlugin,
  getCssMinimizerPlugin,
  getMiniCssExtractPlugin
};
