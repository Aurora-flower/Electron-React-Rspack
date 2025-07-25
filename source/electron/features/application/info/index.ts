import { join, parse, sep } from "node:path"
import {
  getAppPath,
  getAppVesion,
  getPathByName
} from "@main/features/application/methods/path"
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

/**
 * @summary 应用信息模型
 */

const AppPaths: Record<AppPathTypes, string> = {
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

/**
 * @summary 应用信息
 * @remarks
 * - 如果 app.getPath('logs') 被调用前没有先调用 app.setAppLogsPath() ，将创建一个相当于调用 app.setAppLogsPath() 却没有 path 参数的默认日志目录。
 * - 用户的应用程序数据目录，默认情况下指向：
 *    - %APPDATA% - Windows
 *    - $XDG_CONFIG_HOME | ~/.config - Linux
 *    - ~/Library/Application Support - macOS
 */
export class AppInfo implements AppInfoModel {
  name: string = app.name // app.getName())
  // locale: string = getLocale()
  packaged = app.isPackaged
  appFolder: string = getAppPath()
  appUnpackFolder = ""
  sep = sep
  isDev = getIsDev()
  cwd = process.cwd()
  driveLetter = ""
  win32: boolean = isWin()
  version = getAppVesion()
  platform = ""
  paths = AppPaths
  core = ""
  workspace = ""
  private static _instance: AppInfo

  constructor() {
    this.driveLetter = parse(this.cwd).root
    this.appUnpackFolder = replaceSep(
      this.appFolder.replace(FILE_NAMES.Asar, FILE_NAMES.Unpack)
    )
    this.initAppPaths()
    this.core = replaceSep(join(this.appUnpackFolder, FOLDER_NAMES.Core))
    // TODO: 定义 workspace 路径
  }

  private initAppPaths(): void {
    ;(Object.keys(this.paths) as AppPathTypes[]).forEach(name => {
      if (name === "recent" && !this.win32) return
      this.paths[name] = getPathByName(name)
    })
  }

  static getInstance(): AppInfo {
    if (!AppInfo._instance) {
      AppInfo._instance = new AppInfo()
    }
    return AppInfo._instance
  }

  /**
   * @platform darwin | linux
   * @summary 返回当前应用角标计数的 Integer 属性。 将计数设置为 0 将隐藏角标。
   * @remarks
   * - 在 macOS 上，为该属性设置任何非零整数，会显示在 dock 图标上。
   * - 在 Linux 上，这个属性只适用于 Unity 启动器。
   */
  badgeCount = app.badgeCount

  /**
   * @summary Electron 用于全局回退的用户代理字符串。
   * @remarks
   * - 当用户代理在 webContents 或 session 级别没有被设置时，将使用此用户代理。
   * 有助于确保整个应用程序具有相同的用户代理。
   * - 在应用初始化中尽早设置为自定义值，以确保使用的是覆盖的值。
   */
  userAgentFallback = app.userAgentFallback

  /**
   * @readonly
   * @summary 一个 CommandLine 对象，允许读取和操作 Chromium 使用的命令行参数。
   */
  // commandLine = app.commandLine

  /**
   * @readonly
   * @platform darwin
   * @summary Dock 图标
   * @description 一个 Dock | undefined 类型的属性（在 macOS 上是 Dock，在其他平台上则是 undefined），
   * 它允许对用户 Dock 中的 app 图标执行操作。
   */
  // dock: Dock = app.dock

  /**
   * @summary 当前应用的菜单。
   * @description
   * 一个 Menu | null 类型的属性，如果已设置了菜单 (Menu)，则返回 Menu，否则返回 null。 用户可以通过传递一个 Menu 来设置此属性。
   */
  // applicationMenu = app.applicationMenu

  /**
   * @platform darwin | win32
   * @summary 当前应用的 Accessibility Support (Chrome 的辅助功能)状态。
   * @remarks
   * - 默认为禁用
   * - 手动将此属性设置为 true 可启用 Chrome 的辅助功能支持，允许开发人员在应用程序设置中向用户开放无障碍切换。
   * - 此 API 必须在 ready 事件触发后调用
   */
  // accessibilitySupportEnabled = app.isAccessibilitySupportEnabled()
}

export function getAppStaticPath(url?: string): string {
  const { packaged, appFolder } = AppInfo.getInstance()
  const baseOutput = packaged ? "" : OUTPUT_FOLDER
  return join(appFolder, baseOutput, STATIC_FOLDER, url ?? "")
}

// 提供给渲染进程的方法
export function getAppInfo(): AppInfo {
  return AppInfo.getInstance()
}

/* ***** ***** ***** ***** Application Properties Or Functions ***** ***** ***** *****  */
