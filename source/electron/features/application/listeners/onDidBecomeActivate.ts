import { app } from "electron"

/**
 * @platform darwin
 * @summary 当应用即将被激活时触发。
 * @remarks
 * - 不同于 `activate` 事件，`did-become-active` 事件将在每次程序被激活前都触发，
 * 而不仅仅是 Dock 图标被点击或者应用重启。
 * - 当用户通过 macOS 应用切换器切换到程序时也会被触发。
 */
export function onDidBecomeActivate(): void {
  app.on("did-become-active", _event => {})
}
