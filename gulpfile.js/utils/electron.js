/**
 * @file electron 进程管理
 */
const electron = require('electron');
const { spawn } = require('node:child_process');

class ElectronProcess {
  process = null;
  instance = null;
  electronProcess = null;
  constructor() {
    // this.process = null;
    // this.instance = null;
    // this.electronProcess = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ElectronProcess();
    }
    return this.instance;
  }

  start() {
    console.log('Start electron process ...');
    return () =>
      new Promise((resolve, reject) => {
        this.electronProcess = spawn(electron, ['.'], {
          stdio: 'inherit'
        });

        this.electronProcess.on('close', code => {
          console.log(`Subprogress Quit code: ${code}`);
          this.electronProcess = null;
          resolve();
        });

        this.electronProcess.on('error', err => {
          console.error('Electron Error:', err?.message);
          reject(err);
        });
        console.log(
          'Electron running ...',
          this.electronProcess?.pid
        );
        resolve();
      });
  }

  stop() {
    console.log('Stop electron process ...');
    /* 等待进程完全退出 */
    return () =>
      new Promise(resolve => {
        const proc = this.electronProcess;
        if (proc) {
          proc.kill();
          proc.once('exit', () => {
            // 使用once替代on
            console.log('Stop electron process pid:', proc.pid);
            this.electronProcess = null;
            resolve();
          });
        } else {
          resolve(); // 直接resolve避免阻塞
        }
      });
  }
}

module.exports = ElectronProcess;
