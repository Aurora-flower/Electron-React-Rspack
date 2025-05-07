import { resolvePath } from "@main/utils/node/path"

export const WINDOW_OPTIONS = {
  title: process.env?.TITLE ?? "Electron-React-Rspack",
  // frame: !this.isWindows,
  webPreferences: {
    preload: resolvePath("../preload/index.js")
  }
}
