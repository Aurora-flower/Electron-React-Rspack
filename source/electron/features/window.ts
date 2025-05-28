import WindowManager from "@main/helpers/manager/window"
import { BrowserWindow } from "electron"
import type { WebContents } from "electron"

export function isAllWindowClosed(): boolean {
  return getWindowCount() === 0
}

export function getWindowCount(): number {
  return BrowserWindow.getAllWindows()?.length
}

export function getWebContentsWindow(
  webContents: WebContents
): BrowserWindow | null {
  // BrowserWindow.getAllWindows().find(win => win.webContents.getURL() === url);
  return BrowserWindow.fromWebContents(webContents)
}

export function reloadWebContent(windowName: string): void {
  const winM = WindowManager.getInstance()
  const win = windowName ? winM.getWindow(windowName) : winM.mainWindow
  if (win) {
    win.webContents.forcefullyCrashRenderer()
    win.webContents.reload()
  }
}
