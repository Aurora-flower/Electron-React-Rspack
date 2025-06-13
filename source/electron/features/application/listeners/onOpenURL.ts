import { clientNotify } from "@main/features/notification"
import { app } from "electron"

export function onOpenURL(): void {
  /**
   * @platform darwin
   */
  app.on("open-url", (event, url) => {
    clientNotify("Welcome!", `Reference: ${url}`)
  })
}
