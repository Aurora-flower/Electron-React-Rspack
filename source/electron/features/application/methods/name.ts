import { app } from "electron"

/**
 * @summary 获取当前应用程序的名称，即为该应用程序 package.json 文件的 name 字段。
 * @remarks
 * 根据 npm 的命名规则, 通常 package.json 中的 name 字段是一个短的小写字符串。
 * 通常还应该指定一个 productName 字段, 是首字母大写的完整名称，用于表示应用程序的名称。
 * Electron 会优先使用这个字段作为应用名。
 */
export function getAppName(): string {
  return app.getName()
}

export function setAppName(name: string): void {
  app.setName(name)
}
