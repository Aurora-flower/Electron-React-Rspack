import { app } from "electron"

/**
 * @summary 当 browserWindow 失去焦点时触发。
 */
function onBrowserWindowBlur(): void {
  app.on("browser-window-blur", (_event, _window) => {})
}

export default onBrowserWindowBlur
