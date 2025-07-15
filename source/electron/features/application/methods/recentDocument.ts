import { app } from "electron"

/**
 * @platform darwin | win32
 * @summary 添加最近使用的文件路径。
 * @description
 * 此列表由操作系统管理。在 Windows 上，可以从任务栏访问此列表，在 macOS 上，可以从 dock 菜单访问。
 * @param {string} path - 文件路径。
 */
export function addRecentDocument(path: string): void {
  app.addRecentDocument(path)
}

/**
 * @platform darwin | win32
 * @summary 清空最近使用的文件列表。
 */
export function clearRecentDocuments(): void {
  app.clearRecentDocuments()
}
