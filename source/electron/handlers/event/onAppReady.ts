import { app } from "electron";
import WindowManager from "@main/helpers/manager/window";
import { setupAppHooks } from "@main/helpers/modules/app";

async function onAppReady() {
  app.whenReady().then(() => {
    WindowManager.getInstance();
  });

  setupAppHooks();
}

export default onAppReady;
