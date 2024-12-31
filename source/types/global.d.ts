/**
 *  @file 全局类型定义
 */
import './common.d.ts';
import './modules/main.d.ts';
import './modules/preload.d.ts';
import './modules/renderer.d.ts';
// --- /// <reference path="./common.d.ts" />

declare global {
  // interface Window {}
  /* ********************* 主进程的类型定义 ********************* */
  // export namespace MainProcess {}
  /* ********************* 预加载进程的类型定义 ********************* */
  // export namespace PreloadProcess {}
  /* ********************* 渲染进程的类型定义 ********************* */
  // export namespace RendererProcess {}
}

export {};
