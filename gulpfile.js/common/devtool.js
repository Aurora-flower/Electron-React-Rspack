/**
 * @file webpack 与 rspack 的 devtool 配置
 */

/**
 * @constant DEVTOOL devtool 配置
 * @description
 * 定义了在不同构建模式下使用的 devtool 类型，用于生成 source maps。
 * Source maps 可以帮助调试编译后的代码，提供原始源代码的映射信息。
 * @remarks
 * - eval 类型: 使用 eval 函数生成 source maps。适合开发环境，速度较快但文件较大
 * - 非 eval 类型: 不使用 eval 方式生成 source maps。适合生产环境，文件较小但生成速度较慢。
 */
const DEVTOOL = {
  /* ***** ***** ***** ***** eval 类型 ***** ***** ***** ***** */
  Eval: 'eval',
  EvalSourceMap: 'eval-source-map',
  EvalCheapSourceMap: 'eval-cheap-source-map',
  EvalCheapModuleSourceMap: 'eval-cheap-module-source-map',

  /* ***** ***** ***** ***** 非 eval 类型 ***** ***** ***** ***** */
  SourceMap: 'source-map',
  CheapSourceMap: 'cheap-source-map',
  CheapModuleSourceMap: 'cheap-module-source-map',
  InlineSourceMap: 'inline-source-map',
  HiddenSourceMap: 'hidden-source-map',
  NosourcesSourceMap: 'nosources-source-map'
};

module.exports = DEVTOOL;
