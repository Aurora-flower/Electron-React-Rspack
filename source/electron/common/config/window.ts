import { resolvePath } from "@main/utils/node/path"
import { isWin } from "@main/utils/node/process/platform"

export const WINDOW_OPTIONS = {
  title: process.env?.TITLE ?? "Electron-React-Rspack",
  frame: !isWin(),
  webPreferences: {
    preload: resolvePath("../preload/index.js")
  }
}
