/**
 * @file rspack
 * @see {@link https://rspack.dev/zh/guide/start/introduction RSPACK 官方文档}
 * @description
 * - Rspack是字节跳动开发的基于 Rust 的打包工具，设计上兼容 Webpack 的配置结构和插件生态。
 * - Rspack（读音为 /'ɑrespæk/,）是一个基于 Rust 编写的高性能 JavaScript 打包工具，
 * 它提供对 webpack 生态良好的兼容性，能够无缝替换 webpack，并提供闪电般的构建速度。
 */
const getConfig = require('./config');
const { rspack } = require('@rspack/core');

/**
 * 编译
 * @returns {Promise<boolean>}
 */
function compile() {
  return new Promise(resolve => {
    const config = getConfig();

    // ==================== 运行 rspack ====================
    const multiCompiler = rspack(config);
    multiCompiler.run((err, stats) => {
      // process.stdout.write('Stdout:', stats.toString() + '\n');
      if (
        err ||
        stats.hasErrors() /* err 对象不包含编译错误，必须使用 stats.hasErrors() 单独处理 */
      ) {
        if (err) console.error(err);
        if (stats.hasErrors()) {
          console.log(stats.toString({ colors: true }));
        }

        resolve(false);
      }
      resolve(true);
    });
  });
}

module.exports = {
  compile
};
