import { join, parse, sep } from "node:path"
import { getIsPackage } from "@main/features/application/isPackage"
import { replaceSep } from "@main/node/path/replaceSep"
import { getIsDev } from "@main/node/process/env"
import { isWin } from "@main/node/process/platform"
import { app } from "electron"

const FOLDER_NAMES = {
  Core: "core"
}

const FILE_NAMES = {
  Asar: "app.asar",
  Unpack: "app.asar.unpacked"
}

const OUTPUT_FOLDER = "app"

const STATIC_FOLDER = "public"

export class AppInfo implements AppInfoModel {
  name: string = replaceSep(app.getName())
  appFolder: string = replaceSep(app.getAppPath())
  appUnpackFolder = ""
  sep = sep
  isDev = getIsDev()
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
  private static _instance: AppInfo

  constructor() {
    this.driveLetter = parse(this.cwd).root
    this.appUnpackFolder = replaceSep(
      this.appFolder.replace(FILE_NAMES.Asar, FILE_NAMES.Unpack)
    )
    const aboutPath = Object.keys(this.paths) as AppPathTypes[]
    for (let index = 0; index < aboutPath.length; index++) {
      const name = aboutPath[index]
      if (name === "recent" && !this.win32) {
        continue
      }
      this.paths[name] = app.getPath(name).replace(/\\/g, "/")
    }
    this.core = replaceSep(join(this.appUnpackFolder, FOLDER_NAMES.Core))
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
  const baseOutput = isPackaged ? "" : OUTPUT_FOLDER
  return join(AppAsar, baseOutput, STATIC_FOLDER, url ?? "")
}

export function getAppInfo(): AppInfo {
  return AppInfo.getInstance()
}
