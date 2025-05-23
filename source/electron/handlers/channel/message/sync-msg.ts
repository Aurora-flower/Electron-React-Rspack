import { ipcMain } from "electron"

ipcMain.on("synchronous-message", event => {
  event.returnValue = "pong"
})
