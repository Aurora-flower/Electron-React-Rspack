import { setupAppHooks } from "@main/features/app"
import { registerProtocolHandle } from "@main/features/protocol"
import onAppReadyAfter from "@main/handlers/event/onAppReadyAfter"
import LoggerManager from "@main/helpers/manager/logger"
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
