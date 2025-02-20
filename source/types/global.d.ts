/**
 *  @file 全局类型定义
 */
// --- /// <reference path="./common.d.ts" />

// declare interface CustomType { /* 自动全局生效 */ }

/* 此处声明不会自动全局暴露 */
declare global {
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

  /* ***** ***** ***** ***** Window 类型定义扩展 ***** ***** ***** ***** */
  interface Window {}

  /* ***** ***** ***** ***** Window.Navigator 类型定义扩展 ***** ***** ***** ***** */
  interface Navigator {
    readonly deviceMemory?: number;
    readonly presentation?: unknown;
    readonly usb?: unknown;
    readonly windowControlsOverlay?: unknown;
  }
}

export {};
