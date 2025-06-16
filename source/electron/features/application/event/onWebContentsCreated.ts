import { app } from "electron"

/**
 * @summary 当一个新的 webContents 被创建时触发。
 */
function onWebContentsCreated(): void {
  app.on("web-contents-created", (_event, _webContents) => {})
}

export default onWebContentsCreated
