import { app } from "electron";
import WindowManager from "@main/helpers/manager/window";
import { setupAppHooks } from "@main/helpers/modules/app";
import { registerProtocolHandle } from "@main/helpers/modules/protocol";

async function onAppReady() {
  app.whenReady().then(() => {
    registerProtocolHandle();
    WindowManager.getInstance();
  });

  setupAppHooks();
}

export default onAppReady;
