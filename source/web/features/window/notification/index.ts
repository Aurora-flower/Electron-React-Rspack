import { selfCleanTimer } from "@/utils/functions/timer"

export function advancedNotification(): void {
  // 高级通知
}

export function simpleNotification(): void {
  // 简单通知 | 基础通知
  if (!("Notification" in window)) {
    // 检查浏览器是否支持通知
    // alert("当前浏览器不支持桌面通知");
  }
  const notification = {
    title: "附带图像的通知",
    body: "短消息附带自定义图片"
  }
  const notify = new window.Notification("Notification title", notification)
  selfCleanTimer(() => {
    notify.close()
  })
}
