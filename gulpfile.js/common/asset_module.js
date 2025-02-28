/**
 * @summary 资源模块的模块类型
 * @remarks
 * - 使用 'asset/inline' 替换 `url-loader`
 * - 使用 'asset/resource' 替换 `file-loader`
 * - 使用 'asset/source' 替换 `raw-loader`
 */
const AssetModuleType = {
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

module.exports = AssetModuleType;
