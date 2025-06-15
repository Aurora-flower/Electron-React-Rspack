import { app } from "electron"

/**
 * @platform darwin
 * @summary 当用户点击原生的macOS新标签按钮时触发。
 * @remarks
 * 只有在当前 BrowserWindow 有 `tabbingIdentifier` 时，新建tab按钮才可见。
 */
export function onNewWindowForTab(): void {
  app.on("new-window-for-tab", _event => {})
}
