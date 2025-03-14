/**
 * @file gulp 自动任务脚本配置
 * @description 尝试多种构建工具、打包程序的 JavaScript API 配合 gulp 进行构建与打包
 * @see {@link https://gulp.nodejs.cn/docs/en/api/concepts Gulp API 文档}
 */

// 测试代码
const RsCompiler = require('./rs/pack');
const WebpackCompiler = require('./webpack');

exports.rs = RsCompiler;
exports.webpack = WebpackCompiler;

// 注意📢: 如果使用了 `task()` API 注册任务，直接导出即可
// module.exports = {
// };
