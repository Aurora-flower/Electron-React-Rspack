import { IPC_CHANNEL_NAME } from "@main/common/macros"
import WindowManager from "@main/helpers/manager/window"
import { sendLog } from "@main/toolkit/logger"

export async function transmit(msg: Message): Promise<void> {
  const window = WindowManager.getInstance().getMainWindow()
  if (!window) {
    sendLog(
      {
        sign: "transmit",
        module: module.id,
        level: "error"
      },
      "window is not ready"
    )
    return
  }
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
