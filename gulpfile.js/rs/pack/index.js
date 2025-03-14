/**
 * @file rspack 入口
 * @see {@link https://rspack.dev/zh/guide/start/introduction RSPACK 官方文档}
 */
const { rspack } = require('@rspack/core');
const GetRsConfig = require('./get_config');
const ENVIRONMENT = require('../../common/env');

/**
 * @summary 运行 rspack 编译
 * @returns {Promise<boolean>}
 */
function compile() {
  return new Promise(resolve => {
    const mode = process.env.NODE_ENV || ENVIRONMENT.Dev;
    const RsConfig = GetRsConfig(mode);
    console.log('Rspack Config:', RsConfig);
    const multiCompiler = rspack(RsConfig);
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

module.exports = compile;
