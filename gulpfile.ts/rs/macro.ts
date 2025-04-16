import { type DevTool, type Target } from "@rspack/core";

export const ENTRY_FILENAME = {
  Main: "main.ts",
  Index: "index.ts",
  Vendor: "vendor.ts"
};

export const APP_PROCESS_MODE = {
  Electron: "main",
  Preload: "preload",
  Renderer: "renderer"
};

export const BUILD_TARGET: Record<string, Target> = {
  Electron: "electron-main",
  Preload: "electron-preload",
  Renderer: "electron-renderer"
};

export const DEVTOOL: Record<string, DevTool> = {
  /* ***** ***** ***** ***** eval ***** ***** ***** ***** */
  Eval: "eval",
  EvalSourceMap: "eval-source-map",
  EvalCheapSourceMap: "eval-cheap-source-map",
  EvalCheapModuleSourceMap: "eval-cheap-module-source-map",

  /* ***** ***** ***** ***** not eval  ***** ***** ***** ***** */
  SourceMap: "source-map",
  CheapSourceMap: "cheap-source-map",
  CheapModuleSourceMap: "cheap-module-source-map",
  InlineSourceMap: "inline-source-map",
  HiddenSourceMap: "hidden-source-map",
  NosourcesSourceMap: "nosources-source-map"
};
