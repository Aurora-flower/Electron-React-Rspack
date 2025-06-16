import { app } from "electron"

/**
 * @summary 当一个客户证书被请求的时候发出。
 * @remarks
 * url 指的是请求客户端认证的网页地址，调用 callback 时需要传入一个证书列表中的证书。 需要通过调用 `event.preventDefault()` 来防止应用自动使用第一个证书进行验证。
 */
function onSelectClientCertificate(): void {
  app.on(
    "select-client-certificate",
    (event, webContents, url, list, callback) => {
      event.preventDefault()
      callback(list[0])
    }
  )
}

export default onSelectClientCertificate
