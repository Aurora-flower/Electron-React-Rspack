import { ipcMain } from "electron"

ipcMain.on("asynchronous-message", event => {
  event.sender.send("asynchronous-reply", "pong")
})
