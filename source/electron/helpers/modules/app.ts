import { join, parse, sep } from "node:path"
import WindowManager from "@main/helpers/manager/window"
import { clientNotify } from "@main/helpers/modules/notification"
import { isAllWindowClosed } from "@main/helpers/modules/window"
import { isDev } from "@main/node/process/env"
import { PLATFORM, getPlatform, isWin } from "@main/node/process/platform"
import { app } from "electron"

const FOLDER_NAMES = {
  Core: "core"
}

const FILE_NAMES = {
  Asar: "app.asar",
  Unpack: "app.asar.unpacked"
}

// app-information
export class AppInfo implements AppInfoModel {
  name: string = app.getName()
  appFolder: string = app.getAppPath()
  appUnpackFolder = ""
  sep = sep
  isDev = isDev()
  cwd = process.cwd()
  driveLetter = ""
  win32: boolean = isWin()
  version = ""
  platform = ""
  packaged = getIsPackage()
  paths: Record<AppPathTypes, string> = {
    home: "",
    appData: "",
    userData: "",
    sessionData: "",
    temp: "",
    exe: "",
    module: "",
    desktop: "",
    documents: "",
    downloads: "",
    music: "",
    pictures: "",
    videos: "",
    logs: "",
    recent: "",
    crashDumps: ""
  }
  core = ""
  workspace = ""
  private static _instance: AppInfo | null = null

  constructor() {
    this.driveLetter = parse(this.cwd).root
    this.appUnpackFolder = this.appFolder.replace(
      FILE_NAMES.Asar,
      FILE_NAMES.Unpack
    )
    const aboutPath = Object.keys(this.paths) as AppPathTypes[]
    for (let index = 0; index < aboutPath.length; index++) {
      const name = aboutPath[index]
      if (name === "recent" && !this.win32) {
        continue
      }
      this.paths[name] = app.getPath(name)
    }
    this.core = join(this.appUnpackFolder, FOLDER_NAMES.Core)

    // workspace
  }

  static getInstance(): AppInfo {
    if (!AppInfo._instance) {
      AppInfo._instance = new AppInfo()
    }
    return AppInfo._instance
  }
}

export function getAppStaticPath(url?: string): string {
  const isPackaged = AppInfo.getInstance()?.packaged ?? app.isPackaged
  const AppAsar = AppInfo.getInstance()?.appFolder ?? app.getAppPath()
  const baseOutput = isPackaged ? "" : "app"
  return join(AppAsar, baseOutput, "public", url ?? "")
}

export function getAppInfo(): AppInfo {
  return AppInfo.getInstance()
}

export function getIsPackage(): boolean {
  return app.isPackaged
}

export function setupAppHooks(): void {
  app.on("window-all-closed", () => {
    if (getPlatform() !== PLATFORM.darwin) {
      app.quit()
    }
  })

  /**
   * @platform darwin
   */
  app.on("activate", () => {
    if (isAllWindowClosed()) {
      WindowManager.getInstance()?.createMainWindow()
    }
  })

  /**
   * @platform darwin
   */
  app.on("open-url", (event, url) => {
    clientNotify("Welcome!", `Reference: ${url}`)
  })
}

/**
 * @summary 退出应用
 * @param {boolean} force
 * @param {number} code 退出码，默认为 0
 * @remarks
 * 区别:
 * - `quit` 会尝试关闭所有窗口, 将首先发出 `before-quit` 事件。
 *   如果所有窗口都已成功关闭, 则将发出 `will-quit` 事件, 并且默认情况下应用程序将终止。
 * - `exit` 会立即退出，所有窗口都将立即被关闭，而不询问用户。
 */
export function exitApp(force = false, code = 0): void {
  if (force) {
    app.exit(code)
  } else {
    app.quit()
  }
}
