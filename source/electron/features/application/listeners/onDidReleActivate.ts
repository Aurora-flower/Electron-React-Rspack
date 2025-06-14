// import { app } from "electron"

/**
 * @platform darwin
 * @summary 当程序长时间处于非激活（Active）、非聚焦（focus）状态时触发。
 * @remarks 例如：点击其他应用，或者通过应用切换器切换到其他应用时，就会被触发。
 */
export function onDidReleActivate(): void {
  // app.on("did-rele-active", _event => {}) // Tip: 可能已经被弃用
}
