import { app } from "electron"

/***
 * @summary 当所有窗口被关闭后触发，同时应用程序将退出。
 * @remarks 调用 `event.preventDefault()` 将阻止终止应用程序的默认行为。
 */
export function onWillQuit(): void {
  app.on("will-quit", event => {
    event.preventDefault()
  })
}
