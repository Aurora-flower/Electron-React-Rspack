import { app } from "electron"

/**
 * @summary 当 webContents 或者 Utility 进程 想要进行基础验证时触发。
 * @remarks
 * - 默认行为是取消所有身份验证。
 * - 默认行为是取消所有的验证行为，如果需要重写这个行为，需要用 `event.preventDefault()` 来阻止默认行为，
 * 并且使用 `callback(username, password)` 来验证。
 * - 当 callback 在缺少用户名和密码的时候被调用，身份验证请求将被取消，同时将返回身份验证错误到页面。
 */
function onLogin(): void {
  app.on("login", (event, _webContents, _details, _authInfo, callback) => {
    event.preventDefault()
    callback("username", "secret")
  })
}

export default onLogin
