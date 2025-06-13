import { PLATFORM, getPlatform } from "@main/node/process/platform"
import { app } from "electron"

/**
 * @summary 当所有的窗口都被关闭时触发。
 * @remarks
 * - 如果没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果监听了此事件，可以控制是否退出程序。
 * - 如果用户按下了 `Cmd + Q`，或者开发者调用了 `app.quit()`，Electron 会首先关闭所有的窗口然后触发 `will-quit` 事件，在这种情况下 `window-all-closed` 事件不会被触发。
 */
export function onWindowAllClosed(): void {
  app.on("window-all-closed", () => {
    if (getPlatform() !== PLATFORM.darwin) {
      app.quit()
    }
  })
}
