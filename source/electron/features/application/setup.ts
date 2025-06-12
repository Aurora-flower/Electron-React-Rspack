import { clientNotify } from "@main/features/notification"
import { isAllWindowClosed } from "@main/features/window"
import WindowManager from "@main/helpers/manager/window"
import { PLATFORM, getPlatform } from "@main/node/process/platform"
import { app } from "electron"

export function setupAppHooks(): void {
  app.on("window-all-closed", () => {
    if (getPlatform() !== PLATFORM.darwin) {
      app.quit()
    }
  })

  /**
   * @platform darwin
   */
  app.on("activate", () => {
    if (isAllWindowClosed()) {
      WindowManager.getInstance()
    }
  })

  /**
   * @platform darwin
   */
  app.on("open-url", (event, url) => {
    clientNotify("Welcome!", `Reference: ${url}`)
  })
}
