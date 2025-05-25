import { removeFile } from "@main/node/file"
import Logger from "electron-log"

class LoggerManager {
  static isReady = false
  private static instance: LoggerManager
  logger: Logger.MainLogger

  public static getInstance(): LoggerManager {
    if (!LoggerManager.instance) {
      LoggerManager.instance = new LoggerManager()
    }
    return LoggerManager.instance
  }

  constructor() {
    this.initLogger()
    this.logger.log("LoggerManager initialized")
  }

  initLogger(): void {
    const logFilePath = "./application.log"
    removeFile(logFilePath)
    Logger.transports.file.level = "info"
    Logger.transports.file.format =
      "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}"
    Logger.transports.file.resolvePathFn = (): string => logFilePath
    this.logger = Logger
  }
}

export default LoggerManager
