import type { NotificationConstructorOptions } from "electron"
import { Notification } from "electron"

export function clientNotify(title: string, content: string): void {
  const options: NotificationConstructorOptions = {
    title: title,
    body: content,
    silent: true
  }
  new Notification(options).show()
}
