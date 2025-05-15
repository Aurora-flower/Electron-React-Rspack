import { registerIPCChannel } from "@main/handlers/channel"
import WindowManager from "@main/helpers/manager/window"
import { setTheme } from "@main/helpers/modules/theme"
import { loadExtension } from "@main/toolkit/devtool"
import { checkForUpdates } from "@main/toolkit/updater"
import Logger from "electron-log"

async function onAppReadyAfter(): Promise<void> {
  setTheme("dark")
  registerIPCChannel()
  const instance = WindowManager.getInstance()
  if (instance?.mainWindow) {
    checkForUpdates(instance?.mainWindow)
  }
  loadExtension()
  Logger.log("onAppReadyAfter")
}

export default onAppReadyAfter
