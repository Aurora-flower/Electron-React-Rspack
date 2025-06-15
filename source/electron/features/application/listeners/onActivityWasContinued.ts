import { app } from "electron"

/**
 * @platform darwin
 * @summary 在 Handoff 期间，当来自此设备的活动在其他设备恢复时触发。
 */
export function onActivityWasContinued(): void {
  /**
   * @param type 标识活动的字符串。可选值：`NSUserActivity.activityType`。
   * @param userInfo 包含 activity 存储的应用特定状态。
   */
  app.on("activity-was-continued", (_event, _type, _userInfo) => {})
}
