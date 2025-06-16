import { app } from "electron"

/**
 * @summary 在程序关闭窗口前发信号。
 * @remarks
 * 调用 `event.preventDefault()` 将阻止终止应用程序的默认行为。
 */
function onBeforeQuit(): void {
  app.on("before-quit", event => {
    event.preventDefault()
  })
}

export default onBeforeQuit
