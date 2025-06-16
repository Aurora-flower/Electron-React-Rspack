import { app } from "electron"

/**
 * @platform darwin
 * @summary 在 Handoff 期间，当来自此设备的活动在其他设备即将恢复时触发。
 * @remarks
 * 如果需要更新要传输的状态，应该立即调用 `event.preventDefault()`, 构造新的 userInfo 字典，
 * 并及时调用 `app.updateCurrentActiviy()`。
 * 否则，操作会失败，并且触发 `continue-activity-error`
 */
function onUpdateActivityState(): void {
  /**
   * @param type 标识活动的字符串。可选值：`NSUserActivity.activityType`。
   * @param userInfo 包含 activity 存储的应用特定状态。
   */
  app.on("update-activity-state", (event, type, userInfo) => {
    event.preventDefault()
    app.updateCurrentActivity(type, userInfo)
  })
}

export default onUpdateActivityState
