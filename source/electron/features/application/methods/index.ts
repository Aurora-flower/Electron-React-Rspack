import { app } from "electron"

/**
 * @summary 获取当前应用程序是否已准备好
 * @remarks 另见 `app.WhenReady` 确保了应用程序已准备好，可以安全地创建窗口。
 */
export function getIsReady(): boolean {
  return app.isReady() // await app.whenReady()
}
