import { app } from "electron"
import type { NativeImage } from "electron/common"
import type { ApplicationInfoForProtocolReturnValue } from "electron/main"

/**
 * @summary 设置当前可执行文件为协议处理程序
 * @description
 * 将当前可执行文件的设置为协议(也就是 URI scheme) 的默认处理程序。
 * 该方法允许将应用更深入地集成到操作系统中。
 * 一旦注册了，所有 `your-protocol://` 开头的链接将使用当前可执行文件打开。
 * 整个链接，包括协议部分，将作为参数传递给你的应用程序。
 * @param {string} protocol 协议的名称，不带 `://`
 * @param {StringArray} args 传递给可执行文件的参数。 默认为空数组。
 * @param {string} path Electron可执行文件路径。 默认为 `process.execPath`
 * @remarks
 * - 在 macOS 上，只能注册已添加到应用程序的 `info.plist` 中的协议，这些协议在运行时无法修改。
 * 但是，可以在构建时通过 Electron Forge、Electron Packager 或使用文本编辑器编辑 info.plist 来更改文件。
 * - 在 Windows 应用商店环境中（打包为 appx 时），此 API 将对所有调用返回 true，但它设置的注册表项将无法被其他应用程序访问。
 * 为了将 Windows 应用商店应用程序注册为默认协议处理程序，必须在清单中声明该协议。
 * - API 的实现：API 在内部使用 Windows 注册表和 `LSSetDefaultHandlerForURLScheme`。
 * - args、path 均是 win32 系统下支持的参数。
 */
export function setAsDefaultProtocolClient(
  protocol: string,
  args: StringArray = [],
  path?: string
): boolean {
  const execPath = path ?? process?.execPath
  return app.setAsDefaultProtocolClient(protocol, execPath, args)
}

/**
 * @platform drawin | win32
 * @summary 移除默认协议处理程序。
 * @description
 * 此方法检查当前可执行程序是否是协议(也就是URI scheme) 的默认处理程序。 如果是，则会将应用移除默认处理器。
 * @param protocol - 协议名称。
 * @param args - 命令行参数。
 * @param path - 可选，指定可执行文件的路径。
 * @returns {boolean}
 * @remarks
 * - args、path 均是 win32 系统下支持的参数。
 */
export function removeAsDefaultProtocolClient(
  protocol: string,
  args: StringArray = [],
  path?: string
): boolean {
  const execPath = path ?? process?.execPath
  return app.removeAsDefaultProtocolClient(protocol, execPath, args)
}

/**
 * @summary 检查当前可执行程序是否是协议(也就是URI scheme) 的默认处理程序。
 * @param protocol - 协议名称。
 * @param args - 命令行参数。
 * @param path - 可选，指定可执行文件的路径。
 * @returns {boolean}
 * @remarks
 * - args、path 均是 win32 系统下支持的参数。
 * - API 的实现：API 在内部使用 Windows 注册表和 `LSSetDefaultHandlerForURLScheme`。
 */
export function isDefaultProtocolClient(
  protocol: string,
  args: StringArray = [],
  path?: string
): boolean {
  const execPath = path ?? process?.execPath
  return app.isDefaultProtocolClient(protocol, execPath, args)
}

/**
 * @summary 获取处理协议的应用程序名称
 * @param url 要检查的协议名称的 URL。至少包含 `://` (例如：'https://') 的完整 URL。
 * @returns {string} 处理协议的应用程序名称，或如果没有处理程序返回的空字符串。
 * @remarks
 * - 不要依赖于无法保证保持不变的精确格式。Linux 上期望不同格式，可能带有 `.desktop` 后缀。
 */
export function getApplicationNameForProtocol(url: string): string {
  return app.getApplicationNameForProtocol(url)
}

type ApplicationInfoForProtocolModel = {
  /**
   * @summary 应用程序图标。
   */
  icon: NativeImage
  /**
   * @summary 应用程序安装路径。
   */
  path: string
  /**
   * @summary 应用程序显示名称。
   */
  name: string
}

/**
 * @platform drawin | win32
 * @summary 获取处理协议的应用程序信息
 * @param url 要检查的协议名称的 URL。至少包含 `://` (例如：'https://') 的完整 URL。
 * @returns {ApplicationInfoForProtocolModel} 处理协议的应用程序名称，或如果没有处理程序返回的空字符串。
 * @remarks
 * - 不要依赖于无法保证保持不变的精确格式。Linux 上期望不同格式，可能带有 `.desktop` 后缀。
 */
export async function getApplicationInfoForProtocol(
  url: string
): Promise<ApplicationInfoForProtocolModel> {
  return app.getApplicationInfoForProtocol(
    url
  ) as Promise<ApplicationInfoForProtocolReturnValue>
}
