import { app } from "electron"

/**
 * @platform darwin
 * @summary 在 Handoff 期间，当来自其他设备的活动需要恢复时，也会触发。
 * @remarks
 * - 如果想处理这个事件，应该调用 `event.preventDefault()`
 * - 只有具有支持相应的活动类型并且相同的开发团队 ID 作为启动程序时，用户行为才会进行。
 * 所支持活动类型已在应用的 `Info.plist` 中的 `NSUserActivityTypes` 里明确定义。
 */
export function onContinueActivity(): void {
  app.on(
    "continue-activity",
    /**
     * @param type 标识活动的字符串。可选值：`NSUserActivity.activityType`。
     * @param userInfo 包含另一个设备上activity存储的应用特定状态。
     * @param details 描述活动的详细信息
     */
    (event, _type, _userInfo, _details) => {
      event.preventDefault()
    }
  )
}
