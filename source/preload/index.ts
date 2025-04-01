/**
 * @file electron 预加载进程的文件
 * @summary
 * 从 Electron 20 开始，预加载脚本默认 `沙盒化` ，不再拥有完整 Node.js 环境的访问权。
 * - `Electron` 模块: 	        渲染进程模块
 * - `Node.js` 模块:  	        events、timers、url
 * - `Polyfilled` 的全局模块:	   Buffer、process、clearImmediate、setImmediate
 */
// import { contextBridge, ipcRenderer } from 'electron';

// import { debugLog } from '@/common/helper/log';
