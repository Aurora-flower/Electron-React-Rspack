import { registerProtocolHandle } from "@main/features/protocol"
import { registerIPCChannel } from "@main/handlers/channel"
import onAppReadyAfter from "@main/handlers/event/onAppReadyAfter"
import setupAppHooks, {
  setupAppHooksOnBeforeReady
} from "@main/helpers/hooks/setupAppHooks"
import WindowManager from "@main/helpers/manager/window"
import { createAppServer } from "@main/server"
import { app } from "electron"

async function onAppReady(): Promise<void> {
  setupAppHooksOnBeforeReady()
  await createAppServer()
  app
    .whenReady()
    .then(() => {
      registerProtocolHandle()
      WindowManager.getInstance().createMainWindow()
      registerIPCChannel()
    })
    .then(onAppReadyAfter)
  setupAppHooks()
}

export default onAppReady
