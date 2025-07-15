/**
 * @file 应用级别窗口相关操作 - appActivation
 */
import type { FocusOptions } from "electron"
import { app } from "electron"

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
