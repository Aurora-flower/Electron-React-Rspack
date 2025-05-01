import { registerIPCChannel } from "@main/handlers/channel"
import WindowManager from "@main/helpers/manager/window"
import { setTheme } from "@main/helpers/modules/theme"
import { checkForUpdates } from "@main/toolkit/updater"
import Logger from "electron-log"

async function onAppReadyAfter() {
  setTheme("dark")
  registerIPCChannel()
  const instance = WindowManager.getInstance()
  if (instance?.mainWindow) {
    checkForUpdates(instance?.mainWindow)
  }
  Logger.log("onAppReadyAfter")
}

export default onAppReadyAfter
