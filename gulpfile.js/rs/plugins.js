const { rspack } = require('@rspack/core');

function getHtmlRspackPlugin(template) {
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

const PLUGINS = {
  HtmlRspackPlugin: getHtmlRspackPlugin
  // HtmlWebpackPlugin: require('html-webpack-plugin'),
  // CopyWebpackPlugin: require('copy-webpack-plugin'),
  // MiniCssExtractPlugin: require('mini-css-extract-plugin'),
  // CssMinimizerPlugin: require('css-minimizer-webpack-plugin'),
  // TerserPlugin: require('terser-webpack-plugin'),
  // ImageMinimizerPlugin:require('image-minimizer-webpack-plugin'),
};

module.exports = PLUGINS;
