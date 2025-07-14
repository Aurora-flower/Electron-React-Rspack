import { app } from "electron"

/**
 * @summary 当对 url 的 certificate 证书验证失败的时候发出。
 * @remarks
 * 如果需要信任这个证书，需要阻止默认行为 `event.preventDefault()` 并且调用 callback(true)。
 */
function onCertificateError(): void {
  app.on(
    "certificate-error",
    (event, _webContents, url, _error, _certificate, callback) => {
      if (url === "https://github.com") {
        // Verification logic.
        event.preventDefault()
        callback(true)
      } else {
        callback(false)
      }
    }
  )
}

export default onCertificateError
