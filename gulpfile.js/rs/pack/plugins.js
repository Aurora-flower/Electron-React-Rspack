/**
 * @file 插件
 */
const { rspack } = require('@rspack/core');

/**
 * @summary 获取 HtmlRspackPlugin 实例
 * @param {*} template 模板文件路径
 * @returns {rspack.HtmlRspackPlugin} HtmlRspackPlugin 实例
 *
 */
function getHtmlRspackPlugin(template) {
  /**
   * @summary
   * - `style-src`：控制所有 CSS 来源（包括内联样式和外部样式）
   * - `style-src-attr`：仅控制 HTML 元素内联样式（如 <div style="...">）
   * - `style-src-elem`：更细粒度地聚焦外部样式表和 <style> 标签内容
   */
  const HtmlRspackPlugin = new rspack.HtmlRspackPlugin({
    template,
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
  });

  return HtmlRspackPlugin;
}

/**
 * @summary 获取 CssExtractRspackPlugin 实例
 * @param {*} template 模板文件路径
 * @returns {rspack.CssExtractRspackPlugin} CssExtractRspackPlugin 实例
 */
function getMiniCssExtractPlugin() {
  return new rspack.CssExtractRspackPlugin({});
}

const PLUGINS = {
  Html: getHtmlRspackPlugin,
  CssExtract: getMiniCssExtractPlugin
};

module.exports = PLUGINS;
