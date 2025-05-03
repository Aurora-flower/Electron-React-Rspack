import { BrowserWindow } from "electron"

export function isAllWindowClosed() {
  return getWindowCount() === 0
}

export function getWindowCount() {
  return BrowserWindow.getAllWindows()?.length
}
