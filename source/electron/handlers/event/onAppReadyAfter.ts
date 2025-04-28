import { writeFileSync } from "node:fs"
import { registerIPCChannel } from "@main/handlers/channel"
import WindowManager from "@main/helpers/manager/window"
import { checkForUpdates } from "@main/toolkit/updater"
import Logger from "electron-log"

async function onAppReadyAfter() {
  registerIPCChannel()
  const instance = WindowManager.getInstance()
  if (instance?.mainWindow) {
    checkForUpdates(instance?.mainWindow)
  }
  Logger.log("onAppReadyAfter")
}

export default onAppReadyAfter
