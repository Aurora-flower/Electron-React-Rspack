import { setTheme } from "@main/features/theme"
import LoggerManager from "@main/helpers/manager/logger"
import WindowManager from "@main/helpers/manager/window"
import { loadExtension } from "@main/toolkit/devtool"
import { checkForUpdates } from "@main/toolkit/updater"

async function onAppReadyAfter(): Promise<void> {
  setTheme("dark")
  LoggerManager.isReady = true
  const win = WindowManager.getInstance().getMainWindow()
  if (win) {
    checkForUpdates(win)
  }
  loadExtension()
}

export default onAppReadyAfter
