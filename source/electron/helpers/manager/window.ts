import { WINDOW_OPTIONS } from "@main/common/config/window"
import { IPC_CHANNEL_NAME, MAIN_WINDOW_NAME } from "@main/common/macros"
import { getIsPackage } from "@main/helpers/modules/app"
import { resolvePath } from "@main/node/path/resolvePath"
import { isDev } from "@main/node/process/env"
import { isWin } from "@main/node/process/platform"
import { BrowserWindow, Menu } from "electron"
import Logger from "electron-log"

interface WindowState {
  isLoaded: boolean
}

class WindowManager {
  public mainWindow: BrowserWindow | null = null
  private static instance: WindowManager
  private windowOptions = WINDOW_OPTIONS
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

  constructor(mainWindow?: BrowserWindow) {
    if (mainWindow) {
      this.mainWindow = mainWindow
    } else {
      const window = this.createMainWindow()
      if (window) {
        this.addWindow(window, MAIN_WINDOW_NAME)
      }
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

  public getWindowState(): WindowState | null {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) {
      return null
    }
    return {
      isLoaded: true
    }
  }

  public createMainWindow(): BrowserWindow {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      return this.mainWindow
    }
    this.mainWindow = new BrowserWindow(this.windowOptions)
    if (this.isPackage) {
      Menu.setApplicationMenu(null) // win.removeMenu(); | win.setMenu(null);
    }
    if (process.env.DEV_SERVER_URL) {
      this.mainWindow.loadURL(process.env.DEV_SERVER_URL)
    } else {
      this.mainWindow.loadFile(resolvePath("../public/index.html"))
    }
    this.setupWindowHooks()
    return this.mainWindow
  }

  private setupWindowHooks(): void {
    if (!this.mainWindow) return
    const win = this.mainWindow

    // win.maximize();

    if (isDev()) {
      this.mainWindow.webContents.openDevTools({
        mode: "detach",
        activate: true
      })
    }

    win.setMinimumSize(800, 600)

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
      win.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
        source: "ready",
        payload: "did-finish-load"
      } as Message)
    })

    win.webContents.on("devtools-opened", () => {
      this.mainWindow?.focus()
      win.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
        source: "devtools",
        payload: "devtools-opened"
      } as Message)
    })
  }

  private async safeCloseWindow(): Promise<void> {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return
    try {
      this.isClosing = true
      await this.beforeWindowClose()
      this.mainWindow.destroy()
    } catch (error) {
      Logger.error(error)
    }
  }

  private async beforeWindowClose(): Promise<void> {
    // TODO(低优先级): 窗口关闭前的处理
  }
}

export function createWorkerWindow(): void {
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  worker.loadURL(resolvePath("../public/pages/worker/index.html"))
}

export default WindowManager
