import commandLines from "@main/features/application/commandLines"
import { registerProtocolHandle } from "@main/features/protocol"
import { privilegedSchemes } from "@main/features/protocol"
import { setAsDefaultProtocolClient } from "@main/features/protocol"
import { setTheme } from "@main/features/theme"
import { registerIPCChannel } from "@main/handlers/channel"
import setupAppHooks, {
  setupAppHooksOnBeforeReady
} from "@main/helpers/hooks/setupAppHooks"
import LoggerManager from "@main/helpers/manager/logger"
import WindowManager from "@main/helpers/manager/window"
import { createAppServer } from "@main/server"
import { loadExtension } from "@main/toolkit/devtool"
import { checkForUpdates } from "@main/toolkit/updater"
import { app } from "electron"

function advanceExecution(): void {
  setAsDefaultProtocolClient()
  commandLines()
}

export async function onAppReadyBefore(): Promise<void> {
  advanceExecution()
  privilegedSchemes()
}

async function onAppReadyAfter(): Promise<void> {
  setTheme("dark")
  const win = WindowManager.getInstance().getMainWindow()
  if (win) {
    checkForUpdates(win)
  }
  loadExtension()
}

async function onAppReady(): Promise<void> {
  setupAppHooksOnBeforeReady()
  await createAppServer()
  app
    .whenReady()
    .then(() => {
      registerProtocolHandle()
      WindowManager.getInstance().createMainWindow()
      registerIPCChannel()
      LoggerManager.isReady = true
    })
    .then(onAppReadyAfter)
  setupAppHooks()
}

export default onAppReady
