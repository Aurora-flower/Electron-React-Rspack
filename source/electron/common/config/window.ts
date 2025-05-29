import { resolvePath } from "@main/node/path/resolvePath"
// import { isWin } from "@main/node/process/platform"

export const WINDOW_OPTIONS = {
  icon: resolvePath("../../public/favicon.ico"),
  title: process.env?.TITLE ?? "Electron-React-Rspack",
  // frame: !isWin(),
  webPreferences: {
    webSecurity: true,
    sandbox: true,
    preload: resolvePath("../preload/index.js")
  }
}
