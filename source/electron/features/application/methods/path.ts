/**
 * @file AppPath
 * @description 获取应用路径
 */
import { replaceSep } from "@main/node/path/replaceSep"
import { sendLog } from "@main/toolkit/logger"
import type { FileIconOptions, NativeImage } from "electron"
import { app } from "electron"

export function getPathByName(name: AppPathTypes): string {
  try {
    return replaceSep(app.getPath(name))
  } catch (error) {
    sendLog(
      {
        module: module?.id,
        sign: "getPathByName Error",
        level: "error"
      },
      error
    )
    return ""
  }
}

/**
 * @summary 重写 name 的路径为 path，一个特定的文件夹或者文件。
 * @remarks
 * - 如果路径指向一个不存在的目录，则抛出一个 Error。
 * 在这种情况下，目录应该以 `fs.mkdirSync` 或类似的方式创建。
 * - name 参数只能使用 app.getPath 定义过的 name
 * - 默认, 网页的 cookies 和 缓存 将存储在 sessionData 目录下。
 * 如果要更改此位置，必须在 app 模块的 ready 事件之前重写 sessionData 路径。
 */
export function setPathByName(name: AppPathTypes, path: string): void {
  app.setPath(name, path)
}

/**
 * @summary 获取应用程序的版本号。
 * @remarks 如果应用程序的 package. json 文件中找不到版本号, 则返回当前包或者可执行文件的版本。
 */
export function getAppVesion(): string {
  return app.getVersion()
}

export function getAppPath(): string {
  try {
    return replaceSep(app.getAppPath())
  } catch (error) {
    sendLog(
      {
        module: module?.id,
        sign: "getAppPath Error",
        level: "error"
      },
      error
    )
    return ""
  }
}

/**
 * @summary 读取文件的关联图标。
 * @returns {NativeImage}
 * @remarks
 * - 在 Windows 上，有 2 种图标：
 *    - 与某些文件扩展名相关联的图标, 比如 `.mp3` ，`.png` 等。
 *    - 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`
 * - 在 Linux 和 macOS 上，图标依赖于与应用程序关联的文件 mime 类型。
 */
export async function getFileIcon(
  path: string,
  options?: FileIconOptions
): Promise<NativeImage> {
  return await app.getFileIcon(path, options)
}

/**
 * @summary 设置或创建一个应用程序日志目录
 * @param path 自定义日志路径
 * @remarks
 * - 必须是绝对路径
 * - 没有指定 path 参数将导致此目录
 * 在 `macOS` 下被设置为 `~/Library/Logs/YourAppName`;
 * 在 `Linux` 和 `Windows`_` 下将被设置到 `userData` 目录中。
 */
export function setAppLogsPath(path?: string): void {
  app.setAppLogsPath(path)
}
