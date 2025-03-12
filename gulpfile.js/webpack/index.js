/**
 * @file webpack 入口
 */
const GetWebpackConfig = require('./get_config');

/**
 * 运行 webpack 编译
 * @returns {Promise<boolean>}
 */
function compile() {
  return new Promise(resolve => {
    console.log('WebpackConfig:', GetWebpackConfig());
    resolve(true);
  });
}

module.exports = compile;
