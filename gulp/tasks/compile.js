/**
 * @file 执行编译任务
 */
const { task, series } = require('gulp');
const webpack = require('webpack');
const { rimraf } = require('rimraf');
const getConfig = require('../webpack/getConfig');

async function clean(cb) {
  await rimraf('./app');
  cb();
}

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
    console.log(
      '构建成功',
      // webpackConfig,
      '\n',
      stats.toString()
    );
  });
}

task('compile', series(clean, compile));

module.exports = {
  clean,
  compile
};
