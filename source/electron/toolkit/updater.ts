import { getAppInfo } from "@main/features/application/infomation"
import { Notification } from "electron"
import type { BrowserWindow } from "electron"
import Logger from "electron-log"
import { autoUpdater } from "electron-updater"
import type { AppUpdater } from "electron-updater"

export function getAutoUpdater(): AppUpdater {
  Logger.transports.file.level = "verbose"
  Logger.transports.file.format =
    "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}"
  Logger.transports.file.resolvePathFn = (): string => "./update.log"
  autoUpdater.disableWebInstaller = false
  autoUpdater.autoDownload = false
  autoUpdater.logger = Logger
  return autoUpdater
}

export function checkForUpdates(window?: BrowserWindow | undefined): void {
  const appInfo = getAppInfo()
  if (!window || !appInfo?.packaged || !appInfo?.win32) {
    return
  }
  const autoUpdaterInstance = getAutoUpdater()

  autoUpdaterInstance.checkForUpdates()
  // autoUpdaterInstance.checkForUpdatesAndNotify({
  //   title: "更新提示",
  //   body: "检测到新版本"
  // });

  autoUpdaterInstance.on("update-available", () => {
    const notification = new Notification({
      title: "下载询问",
      body: "检测到新版本，是否下载？"
    })
    notification.show()
    notification.on("click", () => {
      autoUpdaterInstance.downloadUpdate()
    })
  })

  autoUpdaterInstance.on("update-not-available", () => {
    // TODO(高优先级): 实现增量更新检测功能，减少下载体积
  })

  autoUpdaterInstance.on("download-progress", progress => {
    window.setProgressBar(progress.percent / 100)
  })

  autoUpdaterInstance.on("update-downloaded", () => {
    const notification = new Notification({
      title: "更新提示",
      body: "更新已下载完成，是否重启应用进行安装？"
    })
    notification.show()
    notification.on("click", () => {
      autoUpdaterInstance.quitAndInstall()
    })
  })

  autoUpdaterInstance.on("error", error => {
    Logger.error("error", error)
  })
}
