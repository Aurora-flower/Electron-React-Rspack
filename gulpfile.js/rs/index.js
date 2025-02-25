/**
 * @file rspack
 * @see {@link https://rspack.dev/zh/guide/start/introduction RSPACK 官方文档}
 * @description
 * - Rspack是字节跳动开发的基于 Rust 的打包工具，设计上兼容 Webpack 的配置结构和插件生态。
 * - Rspack（读音为 /'ɑrespæk/,）是一个基于 Rust 编写的高性能 JavaScript 打包工具，
 * 它提供对 webpack 生态良好的兼容性，能够无缝替换 webpack，并提供闪电般的构建速度。
 */
const { rspack } = require('@rspack/core');
const { getArgv } = require('../utils/argv');
const { _Directory_, _File_ } = require('../common/project');

function compile() {
  return new Promise(resolve => {
    // ==================== 获取参数 ====================
    const args = getArgv();

    // const structure = getProjectStructure();
    console.log(
      'compile running...',
      args,
      Object.assign({}, _Directory_),
      Object.assign({}, _File_)
    );

    // ==================== 运行 rspack ====================
    rspack([], (err, stats) => {
      // process.stdout.write('Stdout:', stats.toString() + '\n');
      if (
        err ||
        stats.hasErrors() /* err 对象不包含编译错误，必须使用 stats.hasErrors() 单独处理 */
      ) {
        resolve(false);
      }
      console.log('compile done...');
      resolve(true);
    });
  });
}

module.exports = {
  compile
};
