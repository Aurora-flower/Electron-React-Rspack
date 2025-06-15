import { app } from "electron"

/**
 * @platform darwin
 * @summary 在 Handoff 期间，当来自其他设备的活动需要恢复前触发。
 * @remarks
 * - 如果想处理这个事件，应该调用 `event.preventDefault()`
 */
export function onContinueActivity(): void {
  app.on(
    "will-continue-activity",
    /**
     * @param type 标识活动的字符串。可选值：`NSUserActivity.activityType`。
     */
    (event, _type) => {
      event.preventDefault()
    }
  )
}
