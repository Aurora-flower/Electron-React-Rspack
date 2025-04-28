import WindowManager from "@main/helpers/manager/window"

export async function transmit(msg: unknown) {
  const window = WindowManager.getInstance().mainWindow
  if (!window) return
  window.webContents.send("trigger-message", msg)
}
