import onAppReadyAfter from "@main/handlers/event/onAppReadyAfter"
import LoggerManager from "@main/helpers/manager/logger"
import { setupAppHooks } from "@main/helpers/modules/app"
import { registerProtocolHandle } from "@main/helpers/modules/protocol"
import { createAppServer } from "@main/server"
import { app } from "electron"

async function onAppReady(): Promise<void> {
  await createAppServer()
  app
    .whenReady()
    .then(() => {
      LoggerManager.isReady = true
      registerProtocolHandle()
    })
    .then(onAppReadyAfter)
  setupAppHooks()
}

export default onAppReady
