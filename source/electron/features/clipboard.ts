import { sendLog } from "@main/toolkit/logger"
import { clipboard } from "electron"

export function getClipboard(): string {
  return clipboard.readText()
}

export function setClipboard(
  _event: Electron.IpcMainInvokeEvent,
  text: string
): void {
  if (text) {
    clipboard.writeText(text)
  } else {
    sendLog(
      {
        module: module.id,
        sign: "SetClipboard",
        level: "warn"
      },
      "text is empty"
    )
  }
}
