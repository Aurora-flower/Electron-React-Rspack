import WindowManager from "@main/helpers/manager/window";
import { app } from "electron";

async function onAppReady() {
  app.whenReady().then(() => {
    WindowManager.getInstance();
  });
}

export default onAppReady;
