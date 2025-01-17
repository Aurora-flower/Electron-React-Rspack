/**
 * @file 开发运行任务
 * @description
 * 1. 存在问题：
 * 当我窗口都关闭时，dev 任务仍然是在进行中的；
 * 如果实现去中止掉任务，则会在重新启动时导致监听结束；
 */
const electron = require('electron');
const { clean, compile } = require('./compile');
const { spawn } = require('node:child_process');
const { task, series, watch /* parallel */ } = require('gulp');

let electronProcess = null;

async function start(done) {
  if (electronProcess) {
    electronProcess.kill();

    /* 等待进程完全退出 */
    await new Promise(resolve => {
      electronProcess.on('exit', () => {
        console.log(
          '终止之前的 Electron 进程',
          electronProcess?.pid
        );
        resolve();
      });
    });
  }

  electronProcess = spawn(electron, ['.'], {
    stdio: 'inherit'
  });

  console.log('Electron running ...', electronProcess?.pid);
  electronProcess.on('close', code => {
    console.log(`子进程退出，退出码 ${code}`);
    electronProcess = null;
    done(code);
  });

  electronProcess.on('error', err => {
    console.error('启动 Electron 进程时出错:', err);
    done(err);
    // process.exit(1);
  });
}

// exports.dev = function () {};
task('dev', function () {
  const options = {
    cwd: process.cwd()
  };

  const mainSource = 'source/electron/**/*';

  /* 监听文件变化，并重新编译 */
  watch(
    ['public/**/*', 'source/**/*', `!${mainSource}`],
    options,
    series(clean, compile)
  );

  /* 监听主进程相关文件变化，并重新启动 Electron */
  watch(
    [mainSource, 'source/preload/**/*'],
    { ignoreInitial: false, ...options },
    series(clean, compile, start)
  );
});
