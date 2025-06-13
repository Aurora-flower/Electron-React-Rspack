import { WINDOW_OPTIONS } from "@main/common/config/window"
import { IPC_CHANNEL_NAME, MAIN_WINDOW_NAME } from "@main/common/macros"
import { getIsPackage } from "@main/features/application/isPackage"
import { createBrowserWindow } from "@main/features/window"
import { resolvePath } from "@main/node/path/resolvePath"
import { getIsDev } from "@main/node/process/env"
import { isWin } from "@main/node/process/platform"
import type { BrowserWindowConstructorOptions } from "electron"
import { BrowserWindow } from "electron"
import Logger from "electron-log"

interface WindowState {
  isLoaded: boolean
}

async function safeCloseWindow(win: BrowserWindow): Promise<void> {
  try {
    WindowManager.isClosing = true
    await beforeWindowClose()
    win.destroy()
  } catch (error) {
    Logger.error(error)
  }
}

async function beforeWindowClose(): Promise<void> {
  // TODO(低优先级): 窗口关闭前的处理
}

function setupWindowHooks(win: BrowserWindow): void {
  if (!win) return
  // win.resizable = false
  const isDevelopment = getIsDev()
  win.maximize()
  win.setMinimumSize(800, 600)
  win.on("close", e => {
    if (!WindowManager.isClosing) {
      e.preventDefault()
      safeCloseWindow(win)
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
    if (isDevelopment) {
      // win.webContents.openDevTools({
      //   mode: "detach",
      //   activate: true
      // })
    }
  })

  win.webContents.on("devtools-opened", () => {
    win?.focus()
    win.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
      source: "devtools",
      payload: "devtools-opened"
    } as Message)
  })
}

class WindowManager {
  public mainWindow: BrowserWindow
  private static instance: WindowManager
  private windowOptions: BrowserWindowConstructorOptions = WINDOW_OPTIONS
  private windows: Map<string, BrowserWindow> = new Map()
  static isClosing = false

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
    if (mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow = mainWindow
    } else {
      const remoteURL = process.env.DEV_SERVER_URL
      const localURL = resolvePath("../public/index.html")
      const url = remoteURL ? remoteURL : localURL
      const window = createBrowserWindow(
        url,
        this.windowOptions,
        !remoteURL,
        setupWindowHooks
      )
      if (window) {
        this.addWindow(window, MAIN_WINDOW_NAME)
      }
    }
  }

  public addWindow(window: BrowserWindow, name: string): void {
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
    if (!this.mainWindow || this.mainWindow.isDestroyed()) {
      return null
    }
    return {
      isLoaded: true
    }
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
