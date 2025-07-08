import commandLines from "@main/features/application/commandLines"
import {
  privilegedSchemes,
  registerProtocolHandle,
  setAsDefaultProtocolClient
} from "@main/features/protocol"
import { setTheme } from "@main/features/theme"
import { registerIPCChannel } from "@main/handlers/channel"
import WindowManager from "@main/helpers/manager/window"
import setupApp, { setupAppOnBeforeReady } from "@main/helpers/setup/setupApp"
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
  // registerAppMenu()
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
  setupAppOnBeforeReady()
  await createAppServer()
  app
    .whenReady()
    .then(() => {
      registerProtocolHandle()
      WindowManager.getInstance().createMainWindow()
      registerIPCChannel()
    })
    .then(onAppReadyAfter)
  setupApp()
}

export default onAppReady
