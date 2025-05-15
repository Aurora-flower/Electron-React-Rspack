import { BrowserWindow } from "electron"

export function isAllWindowClosed(): boolean {
  return getWindowCount() === 0
}

export function getWindowCount(): number {
  return BrowserWindow.getAllWindows()?.length
}
