import { resolvePath } from "@main/node/path/resolvePath"
import { isWin } from "@main/node/process/platform"

/**
 * @summary 窗口配置项
 */
export const WINDOW_OPTIONS = {
  icon: resolvePath("../../public/favicon.ico"),
  title: process.env?.TITLE ?? "花楹一间",
  frame: !isWin(),
  webPreferences: {
    webSecurity: true,
    sandbox: true,
    preload: resolvePath("../preload/index.js")
  }
}
