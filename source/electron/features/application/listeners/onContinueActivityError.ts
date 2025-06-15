import { app } from "electron"

/**
 * @platform darwin
 * @summary 在 Handoff 期间，当来自其他设备的活动恢复失败时触发。
 */
export function onContinueActivity(): void {
  app.on(
    "continue-activity-error",
    /**
     * @param type 标识活动的字符串。可选值：`NSUserActivity.activityType`。
     * @param error 详细的错误信息
     */
    (_event, _type, _error) => {}
  )
}
