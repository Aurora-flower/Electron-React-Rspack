import { join, parse, sep } from "node:path"
import WindowManager from "@main/helpers/manager/window"
import { isAllWindowClosed } from "@main/helpers/modules/window"
import { PLATFORM, getPlatform, isWin } from "@main/utils/node/process/platform"
import { app } from "electron"

const FOLDER_NAMES = {
  Core: "core"
}

const FILE_NAMES = {
  Asar: "app.asar",
  Unpack: "app.asar.unpacked"
}

export class AppInfo implements AppInfoModel {
  name: string = app.getName()
  appFolder: string = app.getAppPath()
  appUnpackFolder = ""
  sep = sep
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
    const about = Object.keys(this.paths) as AppPathTypes[]
    for (let index = 0; index < about.length; index++) {
      const name = about[index]
      this.paths[name] = app.getPath(name)
    }
    this.core = join(this.appUnpackFolder, FOLDER_NAMES.Core)

    // workspace
  }

  static getInstance() {
    if (!AppInfo._instance) {
      AppInfo._instance = new AppInfo()
    }
    return AppInfo._instance
  }
}

export function getAppInfo() {
  return AppInfo.getInstance()
}

export function getIsPackage() {
  return app.isPackaged
}

export function setupAppHooks() {
  app.on("window-all-closed", () => {
    if (getPlatform() !== PLATFORM.darwin) {
      app.quit()
    }
  })

  app.on("activate", () => {
    if (isAllWindowClosed()) {
      WindowManager.getInstance()?.createMainWindow()
    }
  })
}
