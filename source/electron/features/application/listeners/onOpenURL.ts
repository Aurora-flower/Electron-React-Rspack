import { clientNotify } from "@main/features/notification"
import { app } from "electron"

/**
 * @platform darwin
 * @summary 当用户想要在应用中打开一个 URL 时发出。
 * @remarks
 * - 应用程序的 Info.plist 文件必须在 CFBundleURLTypes 这个 key 中定义 url scheme,
 * 并将 NSPrincipalClass 设置为 AtomApplication。
 * - 与 `open-file` 事件一样，请务必在应用程序启动时尽早注册 `open-url` 事件的侦听器，以检测应用程序是否正在被某个 URL 打开。
 */
export function onOpenURL(): void {
  app.on("open-url", (event, url) => {
    event.preventDefault()
    clientNotify("Welcome!", `Reference: ${url}`)
  })
}
