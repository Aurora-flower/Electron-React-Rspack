import { app } from "electron"

/**
 * @summary 退出应用
 * @param {boolean} force
 * @param {number} code 退出码，默认为 0
 * @remarks
 * - `quit` 会尝试关闭所有窗口, 将首先发出 `before-quit` 事件。
 * 如果所有窗口都已成功关闭, 则将发出 `will-quit` 事件, 并且默认情况下应用程序将终止。
 * - `quit` 方法会确保执行所有 beforeunload 和 unload 事件处理程序。
 * 可以在退出窗口之前的 beforeunload 事件处理程序中返回 false 取消退出。
 * - `exit` 会立即退出，所有窗口都将立即被关闭，而不询问用户。
 * - `exit` 方法会使所有窗口都将立即被关闭，而不询问用户，而且 `before-quit` 和 `will-quit` 事件也不会被触发。
 */
export function exitApp(force = false, code = 0): void {
  if (force) {
    app.exit(code)
  } else {
    app.quit()
  }
}

/**
 * @summary 在当前实例退出时重新启动应用程序。
 * @description 默认情况下，新实例将使用与当前实例相同的工作目录和命令行参数。
 * 当指定了 args 时，args 将作为命令行参数传递。
 * 当指定了 execPath 时，execPath 将被执行以重新启动，而不是当前应用程序。
 * @remarks
 * - 注意📢: 此方法在执行时并不会退出应用程序。
 * 在调用 `app.relaunch` 后，必须调用 `app.quit` 或 `app.exit` 才能使应用程序重新启动。
 * - 当多次调用 `app.relaunch` 时，当前实例退出后将启动多个实例。
 */
export function relaunch(): void {
  // 一个立即重启当前实例并向新实例添加命令行参数的示例:
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) })
  exitApp(true)
}
