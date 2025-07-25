/**
 * @file 主进程 - 窗口相关的配置项
 */

import { resolvePath } from "@main/node/path/resolvePath"
import { isWin } from "@main/node/process/platform"
import type { BrowserWindowConstructorOptions } from "electron/main"

/**
 * @summary 创建主窗口的配置项
 */
export const MAIN_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  icon: resolvePath("../../public/favicon.ico"),
  title: process.env?.TITLE ?? "花楹一间",
  frame: !isWin(),
  webPreferences: {
    webSecurity: true,
    sandbox: true,
    preload: resolvePath("../preload/index.js")
  }
}
