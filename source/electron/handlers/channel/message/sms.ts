import WindowManager from "@main/helpers/manager/window"

export async function transmit(msg: Message): Promise<void> {
  const window = WindowManager.getInstance().mainWindow
  if (!window) return
  const message =
    msg.payload && typeof msg.payload === "string" && msg.isJson
      ? JSON.parse(msg.payload)
      : msg.payload
  window.webContents.send("trigger-message", {
    source: msg.source,
    payload: message
  })
}
