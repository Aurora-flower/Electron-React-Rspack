/**
 * @file 执行编译任务
 */
const webpack = require('webpack');
const { rimraf } = require('rimraf');
const { task, series } = require('gulp');
const getConfig = require('../webpack/getConfig');

async function clean(cb) {
  // await rimraf('./app');
  await rimraf([
    './app/node_modules',
    './app/electron',
    './app/preload',
    './app/public'
  ]).finally(cb);
}

function findErrors(log) {
  const regex = /ERROR.*/g;
  const matches = [];
  let match;
  while ((match = regex.exec(log)) !== null) {
    matches.push(match[0]);
  }
  return matches;
}

async function compile(cd) {
  return new Promise(resolve => {
    const webpackConfig = getConfig();
    const compiler = webpack(webpackConfig);
    compiler.run(function (_err, stats) {
      console.log('Compile info:', findErrors(stats.toString()));
      cd();
      resolve();
    });
  });
}

task('compile', series(clean, compile));

module.exports = {
  clean,
  compile
};
