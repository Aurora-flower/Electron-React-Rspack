import { resolvePath } from "@main/helpers/node/path"

export const WINDOW_OPTIONS = {
  title: process.env?.TITLE ?? "Electron-React-Rspack",
  // frame: !this.isWindows,
  webPreferences: {
    preload: resolvePath("../preload/index.js")
  }
}
