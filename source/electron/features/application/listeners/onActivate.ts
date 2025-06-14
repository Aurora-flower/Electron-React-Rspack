import { isAllWindowClosed } from "@main/features/window"
import WindowManager from "@main/helpers/manager/window"
import { app } from "electron"

export function onActivate(): void {
  /**
   * @platform darwin
   */
  app.on("activate", () => {
    if (isAllWindowClosed()) {
      WindowManager.getInstance().createMainWindow()
    }
  })
}
