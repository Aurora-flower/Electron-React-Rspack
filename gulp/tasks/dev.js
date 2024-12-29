const electron = require('electron');
const { compile } = require('./compile');
const { spawn } = require('node:child_process');
const { task, series, watch /* parallel */ } = require('gulp');

let electronProcess = null;

async function start(done) {
  if (electronProcess) {
    console.log('终止之前的 Electron 进程');
    electronProcess.kill();
  }
  console.log('Electron running ...');

  electronProcess = spawn(electron, ['.'], {
    stdio: 'inherit'
  });

  electronProcess.on('close', code => {
    console.log(`子进程退出，退出码 ${code}`);
    electronProcess = null;
    done(code);
  });

  electronProcess.on('error', err => {
    console.error('启动 Electron 进程时出错:', err);
    done(err);
  });
}

// exports.dev = function () {};
task('dev', function () {
  watch(
    ['source/**/*'],
    { ignoreInitial: false, cwd: process.cwd() },
    series(compile, start)
  );
});
