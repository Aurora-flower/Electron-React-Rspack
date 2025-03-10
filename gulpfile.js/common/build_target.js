const BuildTarget = {
  /* Electron 主进程的目标 --  */
  electron: 'electron-main',

  /* Electron 预加载脚本的目标 */
  preload: 'electron-preload',

  /*
  Electron 渲染进程的目标
  注意📢: 
    - 当为 electron-renderer 时，webpack 的配置属性 optimization，使用 splitChunks 则会导致失败；
    - 使用此目标时需注意 nodeIntegration 的设置，否则可能会报错 global is not defined
  */
  renderer: 'web' //'electron-renderer'
};

module.exports = BuildTarget;
