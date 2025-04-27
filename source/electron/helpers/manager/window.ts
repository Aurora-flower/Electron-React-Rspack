import { getIsPackage } from "@main/helpers/modules/app"
import { resolvePath } from "@main/helpers/node/path"
import { isDev } from "@main/helpers/node/process/env"
import { isWin } from "@main/helpers/node/process/platform"
import { BrowserWindow } from "electron"

const MAIN_WINDOW_NAME = "_MAIN_"

class WindowManager {
  public mainWindow: BrowserWindow | null = null
  private static instance: WindowManager
  private windowOptions = {
    title: process.env?.TITLE ?? "Electron-React-Rspack",
    // frame: !this.isWindows,
    webPreferences: {
      preload: resolvePath("../preload/index.js")
    }
  }
  private windows: Map<string, BrowserWindow> = new Map()
  private isClosing = false

  get isWindows(): boolean {
    return isWin()
  }

  get isPackage(): boolean {
    return getIsPackage()
  }

  public static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager()
    }
    return WindowManager.instance
  }

  private constructor(mainWindow?: BrowserWindow) {
    if (mainWindow) {
      this.mainWindow = mainWindow
    } else {
      const window = this.createMainWindow()
      window && this.addWindow(window, MAIN_WINDOW_NAME)
    }
  }

  public addWindow(window: BrowserWindow, name: string): void {
    this.windows.set(name, window)
  }

  public getWindow(name: string): BrowserWindow | undefined {
    return this.windows.get(name)
  }

  public deleteWindow(name: string): void {
    this.windows.delete(name)
  }

  public clearWindows(): void {
    this.windows.clear()
  }

  public getWindowState() {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) {
      return null
    }
    return {}
  }

  private createMainWindow() {
    // if (!process.env.DEV_SERVER_URL) {
    //   process.env.DEV_SERVER_URL = "https://www.w3ccoo.com/";
    // }
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      return this.mainWindow
    }
    this.mainWindow = new BrowserWindow(this.windowOptions)
    if (this.isPackage) {
      // if (this.isWindows) {
      // Menu.setApplicationMenu(null); // win.removeMenu(); | win.setMenu(null);
      // }
    } else {
    }

    if (typeof process.env.DEV_SERVER_URL === "string") {
      this.mainWindow.loadURL(process.env.DEV_SERVER_URL)
    } else {
      this.mainWindow.loadFile(resolvePath("../public/index.html"))
    }

    // this.mainWindow.maximize();
    // this.mainWindow.webContents.on("devtools-opened", () => {
    //   this.mainWindow?.focus();
    // });
    this.setupWindowHooks()
    if (isDev()) {
      this.mainWindow.webContents.openDevTools({
        mode: "detach",
        activate: true
      })
    }
    return this.mainWindow
  }

  private setupWindowHooks() {
    if (!this.mainWindow) return
    const win = this.mainWindow
    win.on("close", e => {
      if (!this.isClosing) {
        e.preventDefault()
        this.safeCloseWindow()
      }
    })

    win.on("closed", () => {
      this.mainWindow = null
      this.isClosing = false
    })

    win.webContents.on("did-finish-load", () => {
      // win.webContents.send("trigger-message", "Hello from main process");
    })
  }

  private async safeCloseWindow() {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return
    try {
      this.isClosing = true
      await this.beforeWindowClose()
      this.mainWindow.destroy()
    } catch (error) {}
  }

  private async beforeWindowClose() {}
}

export default WindowManager
