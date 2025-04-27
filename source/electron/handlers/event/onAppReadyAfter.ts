import { registerIPCChannel } from "@main/handlers/channel";
import { checkForUpdates } from "@main/toolkit/updater";
import WindowManager from "@main/helpers/manager/window";
import Logger from "electron-log";
import { writeFileSync } from "node:fs";

async function onAppReadyAfter() {
  registerIPCChannel();
  const instance = WindowManager.getInstance();
  if (instance?.mainWindow) {
    checkForUpdates(instance?.mainWindow);
  }
  Logger.log("onAppReadyAfter");
}

export default onAppReadyAfter;
