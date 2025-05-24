import { resolvePath } from "@main/utils/node/path"
import { isWin } from "@main/utils/node/process/platform"

export const WINDOW_OPTIONS = {
  icon: resolvePath("../../public/favicon.ico"),
  title: process.env?.TITLE ?? "Electron-React-Rspack",
  frame: !isWin(),
  webPreferences: {
    webSecurity: true,
    sandbox: true,
    preload: resolvePath("../preload/index.js")
  }
}
