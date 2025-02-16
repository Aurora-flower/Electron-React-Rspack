/**
 * @file 开发运行任务
 */
const electron = require('electron');
const { debounce } = require('lodash');
const { buildSeries } = require('./compile');
const { spawn } = require('node:child_process');
const { existsSync } = require('../utils/file');
const { task, series, watch /* parallel */ } = require('gulp');

let electronProcess = null;

async function start() {
  await new Promise((resolve, reject) => {
    if (electronProcess) {
      electronProcess.kill();

      /* 等待进程完全退出 */
      electronProcess.on('exit', () => {
        console.log(
          'Stop origin electron progress pid:',
          electronProcess?.pid
        );
        resolve();
      });
    }

    if (!existsSync('./app/electron/main.js', 'File')) {
      console.log('entry file not found');
      reject('./app/electron/main.js 不存在');
      return;
    }

    electronProcess = spawn(electron, ['.'], {
      stdio: 'inherit'
    });

    electronProcess.on('close', code => {
      console.log(`Subprogress Quit code: ${code}`);
      electronProcess = null;
      resolve();
    });

    electronProcess.on('error', err => {
      console.error('Electron Error:', err?.message);
      reject(err);
    });

    console.log('Electron running ...', electronProcess?.pid);
    resolve();
  });
}

const debouncedStart = debounce(cd => {
  start()
    .then(() => cd())
    .catch(cd);
}, 1 * 1000);

// exports.dev = function () {};
task('dev', async function () {
  const options = {
    cwd: process.cwd()
  };

  const mainSource = 'source/electron/**/*';

  /* 监听文件变化，并重新编译 */
  // const Compile =
  watch(
    [
      '.config/**/*',
      'public/**/*',
      'source/**/*',
      'source/preload/**/*',
      `!${mainSource}`,
      `!source/common/helper/log.ts`,
      'postcss.config.*',
      'tailwind.config.js'
    ],
    options,
    buildSeries
  );
  // Compile.on('change', function (path) {
  //   console.log('Compile File ' + path + ' was changed');
  // });

  // Compile.on('error', function (error) {
  //   console.log('Compile task Error:', error.message);
  // });

  /* 监听主进程相关文件变化，并重新启动 Electron */
  // const Refresh =
  watch(
    [mainSource, 'source/common/helper/log.ts'],
    { ignoreInitial: false, ...options },
    series(buildSeries, debouncedStart)
  );

  // Refresh.on('error', function (error) {
  //   console.log('Refresh task Error:', error.message);
  // });

  // Refresh.on('change', function (path) {
  //   console.log('Refresh File ' + path + ' was changed');
  // });
});
