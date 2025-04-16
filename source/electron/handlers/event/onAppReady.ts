import { app } from "electron";

async function onAppReady() {
  app.whenReady().then(() => {});
}

export default onAppReady;
