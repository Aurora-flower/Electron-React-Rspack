import WindowManager from "@main/helpers/manager/window"

interface Message {
  type: string
  data: string
  isJson: boolean
}

export async function transmit(msg: Message) {
  const window = WindowManager.getInstance().mainWindow
  if (!window) return
  const message =
    msg.data && typeof msg.data === "string" && msg.isJson
      ? JSON.parse(msg.data)
      : msg.data
  window.webContents.send("trigger-message", {
    type: msg.type,
    data: message
  })
}
