/**
 * @file 执行编译任务
 */
const webpack = require('webpack');
const { rimraf } = require('rimraf');
const { task, series } = require('gulp');
const joinPath = require('../utils/joinpath');
const getConfig = require('../webpack/getConfig');
const {
  copyHandler,
  readHandler,
  writeHandler
} = require('../utils/file');

async function clean(cb) {
  rimraf('./app').then(cb);

  // await rimraf([
  //   './app/node_modules',
  //   './app/electron',
  //   './app/preload',
  //   './app/public'
  // ]).finally(cb);
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

async function compileAfter(cb) {
  // TODO: 对 package 文件进行拷贝并修改处理
  const CWD = process.cwd();
  const source = new Proxy(
    {
      src: './package.json',
      dest: './app/package.json'
    },
    {
      get(target, prop) {
        if (prop in target) {
          return joinPath(CWD, target[prop]);
        }
        return undefined;
      }
    }
  );

  const res = await copyHandler(source.src, source.dest);

  const json = await readHandler(source.dest);
  json.main = 'electron/main.js';
  delete json.scripts;
  delete json.devDependencies;
  writeHandler(source.dest, json).then(cb);
  console.log('compileAfter:', res, json);
}

task('compile', series(clean, compile, compileAfter));

module.exports = {
  clean,
  compile,
  compileAfter
};
