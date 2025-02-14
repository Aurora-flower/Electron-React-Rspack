/**
 * @file 开发运行任务
 */
const electron = require('electron');
const { buildSeries } = require('./compile');
const { spawn } = require('node:child_process');
const { existsSync } = require('../utils/file');
const { task, series, watch /* parallel */ } = require('gulp');

let electronProcess = null;

async function start(done) {
  if (electronProcess) {
    electronProcess.kill();

    /* 等待进程完全退出 */
    await new Promise(resolve => {
      electronProcess.on('exit', () => {
        console.log(
          'Stop origin electron progress pid:',
          electronProcess?.pid
        );
        resolve();
      });
    });
  }

  if (!existsSync('./app/electron/main.js', 'File')) {
    done();
    return;
  }

  electronProcess = spawn(electron, ['.'], {
    stdio: 'inherit'
  });

  console.log('Electron running ...', electronProcess?.pid);
  electronProcess.on('close', code => {
    console.log(`Subprogress Quit code: ${code}`);
    electronProcess = null;
    done(code || 0);
  });

  electronProcess.on('error', err => {
    console.error('启动 Electron 进程时出错:', err?.message);
    done(err);
  });
}

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
    series(buildSeries, start)
  );

  // Refresh.on('error', function (error) {
  //   console.log('Refresh task Error:', error.message);
  // });

  // Refresh.on('change', function (path) {
  //   console.log('Refresh File ' + path + ' was changed');
  // });
});
