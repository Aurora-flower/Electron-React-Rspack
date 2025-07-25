import WindowManager from "@main/helpers/manager/window"
import { sendLog } from "@main/toolkit/logger"
import { app } from "electron"

/**
 * @summary 当第二个实例被执行并且调用 `app.requestSingleInstanceLock()` 时，这个事件将在应用程序的首个实例中触发
 * @remarks
 * - argv 是第二个实例的命令行参数的数组, workingDirectory 是这个实例当前工作目录。
 * - 通常, 应用程序会激活窗口并且取消最小化来响应。
 * - 保证在 app 的 ready 事件发出后发出此事件。
 */
function onSecondInstance(): void {
  app.on(
    "second-instance",
    (_event, _argv, _workingDirectory, additionalData) => {
      // 输出第二实例的数据
      sendLog(
        {
          id: "app-second-instance",
          type: "info",
          sign: "second-instance-data:"
        },
        additionalData
      )
      const winM = WindowManager.getInstance()
      const win = winM.getMainWindow()
      if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
      }
    }
  )
}

export default onSecondInstance
