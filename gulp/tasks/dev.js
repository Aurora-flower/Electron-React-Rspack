const electron = require('electron');
const { compile } = require('./compile');
const { spawn } = require('node:child_process');
const { task, series, watch /* parallel */ } = require('gulp');

let electronProcess = null;

async function start(done) {
  if (electronProcess) {
    console.log(
      '终止之前的 Electron 进程',
      electronProcess?.pid
    );
    electronProcess.kill();

    // 等待进程完全退出
    await new Promise(resolve => {
      electronProcess.on('exit', () => {
        console.log('之前的 Electron 进程已退出');
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
  });
}

// exports.dev = function () {};
task('dev', function () {
  const options = {
    cwd: process.cwd()
  };
  watch(
    ['source/**/*', '!source/electron/**/*'],
    options,
    compile
  );
  watch(
    ['source/electron/**/*'],
    { ignoreInitial: false, ...options },
    series(compile, start)
  );
});
