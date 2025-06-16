import { app } from "electron"

/**
 * @summary 当 browserWindow 获得焦点时触发。
 */
export function onBrowserWindowFocus(): void {
  app.on("browser-window-focus", (_event, _window) => {})
}
