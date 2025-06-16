import { resolve } from "node:path"
import { CLIENT_SCHEMA, DEFAULT_SCHEMA } from "@main/common/macros"
import { normalizeDirveLetter } from "@main/helpers/function/driveLetter"
import { sendLog } from "@main/toolkit/logger"
import { net, app, protocol } from "electron"
import type { CustomScheme } from "electron"

export function privilegedSchemes(
  scheme: string = DEFAULT_SCHEMA,
  options?: Array<CustomScheme>
): void {
  let _option: Array<CustomScheme> = options || []
  if (scheme) {
    const defaultOption: CustomScheme = {
      scheme,
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        corsEnabled: true,
        stream: true,
        bypassCSP: true
      }
    }
    const mergeOption = Object.assign(defaultOption, options)
    _option = [mergeOption]
  }
  protocol.registerSchemesAsPrivileged(_option)
}

export function registerProtocolHandle(scheme: string = DEFAULT_SCHEMA): void {
  if (typeof scheme !== "string" || scheme.trim() === "") {
    throw new Error("scheme must be a string and not empty.")
  }

  async function protocolHander(
    request: GlobalRequest
  ): Promise<GlobalResponse> {
    let signal: string
    let err: unknown
    const _fileURL = normalizeDirveLetter(request.url)
    const info = {
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      _fileURL
    }
    try {
      try {
        return await net.fetch(
          _fileURL
          // "https://cn.bing.com/th?id=OHR.KilaueaCaldera_EN-US7764962675_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
        )
      } catch (error) {
        signal = "Request Error"
        err = error
      }
    } catch (error) {
      signal = "Fetch Error"
      err = error
    }
    sendLog(
      {
        module: module?.id,
        level: "error",
        sign: signal
      },
      err,
      info
    )
    return await Promise.reject(err)
  }

  protocol.handle(scheme, protocolHander)
}

export function setAsDefaultProtocolClient(): void {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(CLIENT_SCHEMA, process.execPath, [
        resolve(process.argv[1])
      ])
    }
  } else {
    app.setAsDefaultProtocolClient(CLIENT_SCHEMA)
  }
}
