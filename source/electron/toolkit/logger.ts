import { MAIN_WINDOW_NAME } from "@main/common/macros"
import LoggerManager from "@main/helpers/manager/logger"
import WindowManager from "@main/helpers/manager/window"
import { errorMessage } from "@main/utils/mod/error"
// import type Logger from "electron-log"

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "verbose"

interface LogOptions {
  id?: string
  sign?: string
  type?: string
  // level?: Logger.LogLevel
  level?: LogLevel
  date?: string
  time?: string
  window?: string
  module?: string | number
  payload?: unknown[]
}

export function sendLog(options: LogOptions, ...args: unknown[]): void {
  const date = new Date()
  const info: LogOptions = {
    id: "ELECTRON_LOGGER",
    sign: "log",
    level: "trace",
    type: "log",
    // date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(), // "zh-Hant-TW"
    window: MAIN_WINDOW_NAME,
    module: module?.id,
    ...options,
    payload: args
  }
  if (LoggerManager.isReady) {
    const winM = WindowManager.getInstance()
    const win = info.window ? winM.getWindow(info.window) : winM.getMainWindow()
    if (win) {
      // TODO: 根据 window 对象向渲染进程发送 log 消息
      win.webContents.send("message-transmit", info)
    }
  }
  const loggerInstance = LoggerManager.getInstance()
  // Tip📢: 除了 log\info\warn\error 的输出、级别设置后是才可以被记录的
  if (loggerInstance) {
    const payload = [info.sign, ...info.payload]
    if (info.level === "trace") {
      // loggerInstance.setLogLevel("silly")
      loggerInstance.logger.silly(payload)
    } else if (info.level === "debug") {
      loggerInstance.setLogLevel("debug")
      loggerInstance.logger.debug(payload)
    } else if (info.level === "info") {
      loggerInstance.logger.info(payload)
      // loggerInstance.logger.log(info) // Tip📢: 同为 info 级别
    } else if (info.level === "verbose") {
      loggerInstance.setLogLevel("verbose")
      loggerInstance.logger.verbose(payload)
    } else if (info.level === "warn") {
      loggerInstance.setLogLevel("warn")
      loggerInstance.logger.warn(payload)
    } else if (info.level === "error") {
      loggerInstance.setLogLevel("error")
      loggerInstance.logger.error([
        info.sign,
        errorMessage(args[0]),
        ...info.payload.slice(1)
      ])
    }
  }
}
