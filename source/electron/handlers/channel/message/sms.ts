import { IPC_CHANNEL_NAME } from "@main/common/macros"
import WindowManager from "@main/helpers/manager/window"

export async function transmit(msg: Message): Promise<void> {
  const window = WindowManager.getInstance().mainWindow
  if (!window) return
  const message =
    msg.payload && typeof msg.payload === "string" && msg.isJson
      ? JSON.parse(msg.payload)
      : msg.payload
  window.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
    type: "transmit",
    source: msg.source,
    payload: message
  })
}
