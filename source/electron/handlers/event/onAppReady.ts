import onAppReadyAfter from "@main/handlers/event/onAppReadyAfter"
import WindowManager from "@main/helpers/manager/window"
import { setupAppHooks } from "@main/helpers/modules/app"
import { registerProtocolHandle } from "@main/helpers/modules/protocol"
import { app } from "electron"
import Logger from "electron-log"

async function onAppReady(): Promise<void> {
  app
    .whenReady()
    .then(() => {
      registerProtocolHandle()
      WindowManager.getInstance()
    })
    .then(onAppReadyAfter)
  setupAppHooks()
  Logger.log("onAppReady")
}

export default onAppReady
