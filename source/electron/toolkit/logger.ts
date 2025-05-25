// Logger.log('message');
// Logger.trace('Trace message');
// Logger.debug('Debug message');
// Logger.info('Info message');
// Logger.warn('Warning message');
// Logger.error('Error message');

import { MAIN_WINDOW_NAME } from "@main/common/macros"
import LoggerManager from "@main/helpers/manager/logger"
import WindowManager from "@main/helpers/manager/window"

type LogLevel = "log" | "trace" | "debug" | "info" | "warn" | "error"

interface LogOptions {
  id?: string
  sign?: string
  type?: string
  level?: LogLevel
  date?: string
  time?: string
  window?: string
  payload?: unknown[]
}

export function sendLog(options: LogOptions, ...args: unknown[]): void {
  const date = new Date()
  const info: LogOptions = {
    id: "ELECTRON_LOGGER",
    sign: "log",
    level: "log",
    type: "log",
    // date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(), // "zh-Hant-TW"
    window: MAIN_WINDOW_NAME,
    ...options,
    payload: args
  }
  if (LoggerManager.isReady) {
    const winM = WindowManager.getInstance()
    const win = info.window ? winM.getWindow(info.window) : winM.mainWindow
    if (win) {
      // TODO: 根据 window 对象向渲染进程发送 log 消息
      win.webContents.send("message-transmit", info)
    }
  }
  const loggerInstance = LoggerManager.getInstance()
  if (loggerInstance) {
    if (info.level === "error") {
      loggerInstance.logger.error(info)
    } else if (info.level === "warn") {
      loggerInstance.logger.warn(info)
    } else if (info.level === "info") {
      loggerInstance.logger.info(info)
    } else if (info.level === "debug") {
      loggerInstance.logger.debug(info)
    } else {
      loggerInstance.logger.log(info)
    }
  }
}
