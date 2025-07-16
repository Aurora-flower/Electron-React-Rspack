import { Notification } from "electron"
import type { NotificationConstructorOptions } from "electron/main"

/**
 * @summary 检测当前系统是否支持桌面通知
 * @returns {boolean} 当前系统是否支持桌面通知
 */
export function isSupportNotification(): boolean {
  return Notification.isSupported()
}

export function clientNotify(title: string, content: string): void {
  const options: NotificationConstructorOptions = {
    title: title,
    body: content,
    silent: true
  }
  new Notification(options).show()
}
