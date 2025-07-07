export const ENTRY_FILENAME = {
  Main: "main.ts",
  Index: "index.ts",
  Vendor: "vendor.ts"
} as const

export const APP_PROCESS_MODE = {
  Electron: "main",
  Preload: "preload",
  Renderer: "renderer"
} as const

//  Record<string, Target>
export const BUILD_TARGET = {
  Electron: "electron-main",
  Preload: "electron-preload",
  Renderer: "web" // "electron-renderer"
} as const

// Record<string, DevTool>
export const DEVTOOL = {
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
} as const
