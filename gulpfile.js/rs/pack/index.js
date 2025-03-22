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
  return new Promise((resolve, reject) => {
    const mode = process.env.NODE_ENV || ENVIRONMENT.Dev;
    const RsConfig = GetRsConfig(mode);
    console.log('Rspack Config:', RsConfig);
    try {
      const multiCompiler = rspack(RsConfig);
      const watcher = multiCompiler.watch(
        {
          /* number */
          // aggregateTimeout: 5,
          /* boolean */
          // followSymlinks: true,
          /* string | RegExp | string[] */
          // ignored: [],
          /* boolean | number */
          // poll: false,
          /* boolean */
          // stdin: false
        },
        (err, stats) => {
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
        }
      );

      /* 添加关闭钩子（按需）*/
      process.on('SIGINT', () => {
        watcher.close();
        process.exit();
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

module.exports = compile;
