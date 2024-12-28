/**
 * @file 执行编译任务
 */
const { task } = require('gulp');
const webpack = require('webpack');
const getConfig = require('../webpack/getConfig');

task('compile', function (done) {
  const webpackConfig = getConfig();
  const compiler = webpack(webpackConfig);
  compiler.run(function (err, stats) {
    if (err) {
      console.log('构建失败', err);
      return;
    }
    console.log('构建成功', stats.toString());
  });
  done();
});
