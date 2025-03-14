/**
 * @file 常量文件
 */

/**
 * @constant APP_PROCESS_MODE 应用进程结构定义
 * @description
 * - `electron`: 主进程
 * - `preload`: 预加载进程
 * - `renderer`: 渲染进程
 */
const APP_PROCESS_MODE = {
  /* 主进程 */
  Electron: 'main',
  /* 预加载进程 */
  Preload: 'preload',
  /* 渲染进程 */
  Renderer: 'renderer'
};

module.exports = {
  APP_PROCESS_MODE
};
