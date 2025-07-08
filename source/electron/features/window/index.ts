import WindowManager from "@main/helpers/manager/window"
import { resolvePath } from "@main/node/path/resolvePath"
import type {
  BrowserWindowConstructorOptions,
  WebContents
} from "electron/main"
import { BrowserWindow } from "electron/main"

export function byNameFindWindow(name = ""): BrowserWindow | null {
  const winM = WindowManager.getInstance()
  return name ? winM.getWindow(name) : winM.getMainWindow()
}

export function byWebContentsFindWindow(
  webContents: WebContents
): BrowserWindow | null {
  // BrowserWindow.getAllWindows().find(win => win.webContents.getURL() === url);
  return BrowserWindow.fromWebContents(webContents)
}

export function isAllWindowClosed(): boolean {
  return getWindowCount() === 0
}

export function getWindowCount(): number {
  return BrowserWindow.getAllWindows()?.length
}

export function reloadWebContent(windowName = ""): void {
  const win = byNameFindWindow(windowName)
  if (win) {
    win.webContents.forcefullyCrashRenderer()
    win.webContents.reload()
  }
}

export function destroyBrowserWindow(windowName = ""): void {
  const win = byNameFindWindow(windowName)
  if (!win || win.isDestroyed()) return
  win.destroy()
}

export function createBrowserWindow(
  url: string,
  options: BrowserWindowConstructorOptions = {},
  isLocal = false,
  setupCallback?: (win: BrowserWindow) => void
): BrowserWindow {
  const win: AnyModel = new BrowserWindow(options as AnyModel)
  if (isLocal) {
    win.loadFile(resolvePath(url))
  } else {
    win.loadURL(process.env.DEV_SERVER_URL)
  }
  if (setupCallback) {
    setupCallback(win)
  }
  // createView() // TEST
  return win
}
