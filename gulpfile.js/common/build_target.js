/**
 * @file webpack 与 rspack 的构建目标
 */

/**
 * @constant BUILD_TARGET  构建目标对象
 * @description
 * 定义了构建时的目标环境类型，用于指定不同进程或平台的构建配置。
 */
const BUILD_TARGET = {
  // /* Web 应用程序的默认目标环境 */
  // Web: 'web',

  // /* Node.js 环境的目标 */
  // Node: 'node',

  // /* Web Worker 环境的目标 */
  // WebWorker: 'webworker',

  // /* 异步 Node.js 环境的目标 */
  // AsyncNode: 'async-node',

  // /* 根据 browserslist 配置的目标环境 */
  // Browser: 'browserslist',

  // /* Webkit 环境的目标（已弃用） */
  // Webkit: 'node-webkit',

  // /* NW.js 环境的目标 */
  // NW: 'nwjs',

  /* Electron 主进程的目标 --  */
  Electron: 'electron-main',

  /* Electron 预加载脚本的目标 */
  Preload: 'electron-preload',

  /*
  Electron 渲染进程的目标
  注意📢: 
    - 当为 electron-renderer 时，webpack 的配置属性 optimization，使用 splitChunks 则会导致失败；
    - 使用此目标时需注意 nodeIntegration 的设置，否则可能会报错 global is not defined
  */
  Renderer: 'electron-renderer' // 'web' | 'electron-renderer'
};

module.exports = BUILD_TARGET;
