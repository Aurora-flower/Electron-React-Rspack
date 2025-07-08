import { WINDOW_OPTIONS } from "@main/common/config/window"
import { MAIN_WINDOW_NAME } from "@main/common/macros"
import { createBrowserWindow } from "@main/features/window"
import setupWindow from "@main/helpers/setup/setupWindow"
import { resolvePath } from "@main/node/path/resolvePath"
import type {
  BrowserWindow,
  BrowserWindowConstructorOptions
} from "electron/main"

interface WindowState {
  isLoaded: boolean
}

class WindowManager {
  private mainWindow: BrowserWindow
  private static instance: WindowManager
  private windowOptions: BrowserWindowConstructorOptions = WINDOW_OPTIONS
  private windows: Map<string, BrowserWindow> = new Map()
  private isClosing = false

  public static getInstance(): WindowManager {
    const ins = WindowManager.instance
    if (!ins) {
      WindowManager.instance = new WindowManager()
    }
    return WindowManager.instance
  }

  public createMainWindow(): void {
    const remoteURL = process.env.DEV_SERVER_URL
    const localURL = resolvePath("../public/index.html")
    const url = remoteURL ? remoteURL : localURL
    const win = createBrowserWindow(
      url,
      this.windowOptions,
      !remoteURL,
      setupWindow
    )
    this.mainWindow = win
    const winM = WindowManager.getInstance()
    winM.addWindow(MAIN_WINDOW_NAME, win)
  }

  public addWindow(name: string, win: BrowserWindow): void {
    this.windows.set(name, win)
  }

  public getWindow(name: string): BrowserWindow | undefined {
    if (!this.windows.has(name)) {
      return undefined
    }
    return this.windows.get(name)
  }

  public setWindowTitle(name: string, title: string): void {
    const win = this.windows.get(name)
    if (win) {
      win.setTitle(title)
    }
  }

  public deleteWindow(name: string): void {
    if (!this.windows.has(name)) {
      return
    }
    this.windows.delete(name)
  }

  public clearWindows(): void {
    this.windows.clear()
  }

  public getWindowState(): WindowState | null {
    // TODO: 获取窗口的属性
    if (
      this.mainWindow ||
      (this.mainWindow && !this.mainWindow?.isDestroyed())
    ) {
      return null
    }
    return {
      isLoaded: true
    }
  }

  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  public getCloseFlag(): boolean {
    return this.isClosing
  }

  public setCloseFlag(flag: boolean): void {
    this.isClosing = flag
  }
}

export default WindowManager
