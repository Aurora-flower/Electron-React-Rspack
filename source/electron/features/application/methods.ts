import { app } from "electron"
import type { FocusOptions } from "electron"

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
 * - 请注意，此方法在执行时并不会退出应用程序。
 * 在调用 `app.relaunch` 后，必须调用 `app.quit` 或 `app.exit` 才能使应用程序重新启动。
 * - 当多次调用 `app.relaunch` 时，当前实例退出后将启动多个实例。
 */
export function relaunchApp(): void {
  // 一个立即重启当前实例并向新实例添加命令行参数的示例:
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) })
  exitApp(true)
}

export function getIsReady(): boolean {
  return app.isReady()
}

/* ***** ***** ***** ***** 窗口相关操作 ***** ***** ***** *****  */

/**
 * @summary
 * 在 Linux 上，使第一个可见窗口获得焦点。
 * 在 macOS上，将应用程序变成激活的 app。
 * 在 Windows上，使应用程序的第一个窗口获得焦点。
 * @param {FocusOptions} options 可选选项
 * @property {options.steal} steal Macos 将接收者设为活动应用，即使另一个应用当前处于活动状态。
 * 应该尽可能少地使用 steal 选项。
 */
export function focus(options?: FocusOptions): void {
  app.focus(options)
}

/**
 * @platform darwin
 * @summary 应用的所有窗口是否都被隐藏
 * @returns 如果应用的所有窗口都被隐藏（比如在 MacOS 系统下使用了 Command-H 快捷键）则为 true ，否则返回 false。
 */
export function isHidden(): boolean {
  return app.isHidden()
}

/**
 * @platform darwin
 * @summary 隐藏所有的应用窗口，不是最小化.
 */
export function hidden(): void {
  if (isHidden()) {
    return
  }
  app.hide()
}

/**
 * @platform darwin
 * @summary 显示隐藏后的应用程序窗口。
 * @remarks 不会使它们自动获得焦点。
 */
export function show(): void {
  if (isHidden()) {
    app.show()
  }
}
