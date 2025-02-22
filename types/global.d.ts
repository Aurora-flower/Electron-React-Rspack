/**
 * @file 全局类型定义
 * @remarks
 * - TypeScript 历史上允许一种称为“自定义模块”（）的代码组织形式，后来重命名为“命名空间”（）。
 * 命名空间是组织 TypeScript 代码的一种过时的方式。
 * - 不允许某些三斜杠指令，以支持 ES6 样式的导入声明。
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
  // interface Window {}

  /* ***** ***** ***** ***** Window.Navigator 类型定义扩展 ***** ***** ***** ***** */
  interface Navigator {
    readonly deviceMemory?: number;
    readonly presentation?: unknown;
    readonly usb?: unknown;
    readonly windowControlsOverlay?: unknown;
  }
}

export {};
