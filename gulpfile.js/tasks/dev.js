/**
 * @file 承担编译任务
 */
const compile = require('./compile');
const ElectronProcess = require('../utils/electron');
const { series, watch } = require('gulp');

async function devWatch() {
  console.log('devWatch');
  const instance = ElectronProcess.getInstance();
  const options = {
    cwd: process.cwd()
  };

  const mainSource = 'source/electron/**/*';

  watch(
    [mainSource, '!source/types'],
    {
      ignoreInitial: false,
      ...options,
      // delay: 1000 * 1, // 延迟时间
      // alwaysStat: false, // 关闭不必要的stat信息
      // usePolling: false, // 禁用轮询模式
      // depth: 5, // 限制监控目录深度
      // atomic: true, // 处理原子保存操作
      awaitWriteFinish: {
        stabilityThreshold: 3000, // 文件稳定时间
        pollInterval: 1000 // 检查间隔
      }
    },
    series(instance.stop(), instance.start())
  );
}

module.exports = series(compile, devWatch);
