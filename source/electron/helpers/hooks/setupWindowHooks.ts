import { IPC_CHANNEL_NAME } from "@main/common/macros"
import LoggerManager from "@main/helpers/manager/logger"
import WindowManager from "@main/helpers/manager/window"
import { getIsDev } from "@main/node/process/env"
import { sendLog } from "@main/toolkit/logger"
import type { BrowserWindow } from "electron"
import Logger from "electron-log"

async function safeCloseWindow(win: BrowserWindow): Promise<void> {
  try {
    const winM = WindowManager.getInstance()
    await beforeWindowClose()
    win.destroy()
    if (!winM.getCloseFlag()) {
      winM.setCloseFlag(true)
    }
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
    e.preventDefault()
    safeCloseWindow(win)
  })

  win.on("closed", () => {
    const winM = WindowManager.getInstance()
    winM.setCloseFlag(false)
  })

  /* ***** ***** ***** ***** webContents Events ***** ***** ***** *****  */
  win.webContents.on("did-finish-load", () => {
    LoggerManager.isReady = true
    win.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
      source: "ready",
      payload: "did-finish-load"
    } as Message)
    sendLog(
      {
        module: module?.id,
        sign: "did-finish-load",
        level: "info"
      },
      process.execArgv
    )
    if (isDevelopment) {
      // win.webContents.openDevTools({
      //   mode: "detach",
      //   activate: true
      // })
    }
  })

  win.webContents.on("devtools-opened", () => {
    // win?.focus()
    win.webContents.send(IPC_CHANNEL_NAME.MESSAGE_TRANSMIT, {
      source: "devtools",
      payload: "devtools-opened"
    } as Message)
  })
}

export default setupWindowHooks
