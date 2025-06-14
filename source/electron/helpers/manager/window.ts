import { WINDOW_OPTIONS } from "@main/common/config/window"
import { getIsPackage } from "@main/features/application/isPackage"
import { createBrowserWindow } from "@main/features/window"
import setupWindowHooks from "@main/helpers/hooks/setupWindowHooks"
import { resolvePath } from "@main/node/path/resolvePath"
import { isWin } from "@main/node/process/platform"
import type { BrowserWindowConstructorOptions } from "electron"
import type { BrowserWindow } from "electron"

interface WindowState {
  isLoaded: boolean
}

class WindowManager {
  private mainWindow: BrowserWindow
  private static instance: WindowManager
  private windowOptions: BrowserWindowConstructorOptions = WINDOW_OPTIONS
  private windows: Map<string, BrowserWindow> = new Map()
  private isClosing = false

  get isWindows(): boolean {
    return isWin()
  }

  get isPackage(): boolean {
    return getIsPackage()
  }

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
    this.mainWindow = createBrowserWindow(
      url,
      this.windowOptions,
      !remoteURL,
      "",
      setupWindowHooks
    )
  }

  public addWindow(name: string, window: BrowserWindow): void {
    this.windows.set(name, window)
  }

  public getWindow(name: string): BrowserWindow | undefined {
    if (!this.windows.has(name)) {
      return undefined
    }
    return this.windows.get(name)
  }

  public setWindowTitle(name: string, title: string): void {
    const window = this.windows.get(name)
    if (window) {
      window.setTitle(title)
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
