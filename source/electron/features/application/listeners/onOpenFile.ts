import { sendLog } from "@main/toolkit/logger"
import { app } from "electron"

/**
 * @platform darwin
 * @summary 当用户想要在应用中打开一个文件时发出。
 * @remarks
 * - `open-file` 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。
 * - `open-file` 也会在一个文件被拖到 `dock` 并且还没有运行的时候发出。
 * - 请确认在应用启动的时候(甚至在 `ready` 事件发出前) 就对 `open-file` 事件进行监听。
 * - 如果想处理这个事件，应该调用 `event.preventDefault()`
 * - 在 Windows 系统中，需要解析 `process.argv` (在主进程中) 来获取文件路径
 */
export function onOpenFile(): void {
  app.on("open-file", (event, path) => {
    event.preventDefault()
    sendLog(
      {
        module: module?.id,
        sign: "open-file"
      },
      `The application will open file ${path}.`
    )
  })
}
