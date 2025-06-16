import { app } from "electron"

/**
 * @platform darwin
 * @summary 当用户点击原生的 macOS 新标签按钮时触发。
 * @remarks
 * 只有在当前 BrowserWindow 有 tabbingIdentifier 时，新建 tab 按钮才可见。
 */
function onNewWindowForTab(): void {
  app.on("new-window-for-tab", _event => {})
}

export default onNewWindowForTab
