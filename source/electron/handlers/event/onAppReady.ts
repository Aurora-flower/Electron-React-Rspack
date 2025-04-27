import { app } from "electron";
import WindowManager from "@main/helpers/manager/window";
import { setupAppHooks } from "@main/helpers/modules/app";
import { registerProtocolHandle } from "@main/helpers/modules/protocol";
import Logger from "electron-log";
import onAppReadyAfter from "@main/handlers/event/onAppReadyAfter";

async function onAppReady() {
  app
    .whenReady()
    .then(() => {
      registerProtocolHandle();
      WindowManager.getInstance();
    })
    .then(onAppReadyAfter);
  setupAppHooks();
  Logger.log("onAppReady");
}

export default onAppReady;
