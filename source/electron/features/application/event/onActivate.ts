import { isAllWindowClosed } from "@main/features/window"
import WindowManager from "@main/helpers/manager/window"
import { app } from "electron"

/**
 * @platform darwin
 * @summary 当应用被激活时发出。
 * @remarks
 * 各种操作都可以触发此事件, 例如:
 * 首次启动应用程序时、
 * 尝试在应用程序已运行时、
 * 单击应用程序的坞站或任务栏图标时
 */
function onActivate(): void {
  app.on("activate", (event, hasVisibleWindows) => {
    if (isAllWindowClosed() && !hasVisibleWindows) {
      WindowManager.getInstance().createMainWindow()
    }
  })
}

export default onActivate
