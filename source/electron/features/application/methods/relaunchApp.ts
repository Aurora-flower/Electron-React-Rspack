import { exitApp } from "@main/features/application/methods/exitApp"
import { app } from "electron"

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
