import { app } from "electron"

/**
 * @platform darwin | win32
 * @summary 当 Chrome 的辅助功能状态改变时触发。
 * @description 当启用或禁用辅助技术时将触发此事件，例如屏幕阅读器 。
 * @see {@link https://www.chromium.org/developers/design-documents/accessibility}
 */
function onAccessibilitySupportChanged(): void {
  app.on(
    "accessibility-support-changed",
    (_event, accessibilitySupportEnabled) => {
      if (accessibilitySupportEnabled) {
        // 辅助功能已启用
      } else {
        // 辅助功能已禁用
      }
    }
  )
}

export default onAccessibilitySupportChanged
