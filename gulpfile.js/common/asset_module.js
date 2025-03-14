/**
 * @file webpack 与 rspack 的资源模块
 */

/**
 * @constant ASSET_MODULE_TYPE 资源模块的模块类型 (Asset Module Type)
 * @description
 * Asset 模块是一种特殊的模块类型，用来处理静态资源，例如图片、字体、视频等。
 */
const ASSET_MODULE_TYPE = {
  /* 将资源转换为单独的文件，并且导出产物地址 */
  Resource: 'asset/resource',

  /* 将资源转换为 DataURI，使用 Base64 编码，暂不支持编码配置 */
  Inline: 'asset/inline',

  /* 将资源文件转为字符串导出 */
  Source: 'asset/source',

  /**
   * @summary 自动选择资源模块类型
   * @description
   * 默认如果资源体积小于等于 8096 bytes(size < 8kb)，则使用 'asset/inline' 策略，否则使用 'asset/resource' 策略。
   */
  Auto: 'asset'
};

module.exports = ASSET_MODULE_TYPE;
