/**
 * @file 执行编译任务
 */
const { task } = require('gulp');
const webpack = require('webpack');
const getConfig = require('../webpack/getConfig');

function compile(cd) {
  const webpackConfig = getConfig();
  const compiler = webpack(webpackConfig);
  compiler.run(function (err, stats) {
    if (err) {
      cd();
      console.log('构建失败', err);
      return;
    }
    cd();
    console.log('构建成功', stats.toString());
  });
}

task('compile', function (done) {
  compile(done);
});

module.exports = {
  compile
};
