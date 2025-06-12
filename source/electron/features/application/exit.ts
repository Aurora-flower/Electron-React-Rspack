import { app } from "electron"

/**
 * @summary 退出应用
 * @param {boolean} force
 * @param {number} code 退出码，默认为 0
 * @remarks
 * 区别:
 * - `quit` 会尝试关闭所有窗口, 将首先发出 `before-quit` 事件。
 *   如果所有窗口都已成功关闭, 则将发出 `will-quit` 事件, 并且默认情况下应用程序将终止。
 * - `exit` 会立即退出，所有窗口都将立即被关闭，而不询问用户。
 */
export function exitApp(force = false, code = 0): void {
  if (force) {
    app.exit(code)
  } else {
    app.quit()
  }
}
