/**
 *  @file 全局类型定义
 */
import './main';
import './shims';
import './common';
import './preload';
import './renderer';
// --- /// <reference path="./common.d.ts" />

declare global {
  // interface Window {}
  /* ***** ***** ***** ***** 主进程的类型定义 ***** ***** ***** ***** */
  // export namespace MainProcess {}
  /* ***** ***** ***** ***** 预加载进程的类型定义 ***** ***** ***** ***** */
  // export namespace PreloadProcess {}
  /* ***** ***** ***** ***** 渲染进程的类型定义 ***** ***** ***** ***** */
  // export namespace RendererProcess {}
  /**
   * @summary （若是不安装 webpakc-env 的情况下，）解决使用 require.context 报错 Property 'context' does not exist on type 'NodeRequire' 的问题
   */
  // interface NodeRequire {
  //   /** A special feature supported by webpack's compiler that allows you to get all matching modules starting from some base directory.  */
  //   context: (
  //     directory: string,
  //     useSubdirectories: boolean,
  //     regExp: RegExp
  //   ) => any;
  // }
}

export {};
