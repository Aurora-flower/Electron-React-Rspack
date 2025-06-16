import { app } from "electron"

/**
 * @summary 当 Electron 创建了一个新的 session 后被触发
 */
function onSessionCreated(): void {
  app.on("session-created", _session => {})
}

export default onSessionCreated
