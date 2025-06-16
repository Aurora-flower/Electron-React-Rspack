import { app } from "electron"

/**
 * @summary 当一个新的 browserWindow 被创建时触发。
 */
function onBrowserWindowCreated(): void {
  app.on("browser-window-created", (_event, _window) => {})
}

export default onBrowserWindowCreated
