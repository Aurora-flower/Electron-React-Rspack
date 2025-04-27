import { DEFAULT_SCHEMA } from "@main/common/const"
import { normalizeDirveLetter } from "@main/helpers/function/driveLetter"
import { net, protocol } from "electron"

export function privilegedSchemes(
  scheme: string = DEFAULT_SCHEMA,
  options?: Array<Electron.CustomScheme>
) {
  let _option: Array<Electron.CustomScheme> = options || []
  if (scheme) {
    const defaultOption: Electron.CustomScheme = {
      scheme,
      privileges: {
        bypassCSP: true,
        standard: true,
        secure: true,
        supportFetchAPI: true
        // corsEnabled: true,
        // stream: true
      }
    }
    const mergeOption = Object.assign(defaultOption, options)
    _option = [mergeOption]
  }
  protocol.registerSchemesAsPrivileged(_option)
}

export function registerProtocolHandle(scheme: string = DEFAULT_SCHEMA) {
  if (typeof scheme !== "string" || scheme.trim() === "") {
    return new Error("scheme must be a string and not empty.")
  }

  async function protocolHander(
    request: GlobalRequest
  ): Promise<GlobalResponse> {
    try {
      const fileURL = normalizeDirveLetter(request.url)
      console.log("request", request.url, fileURL)
      return await net.fetch(
        // fileURL
        "https://cn.bing.com/th?id=OHR.KilaueaCaldera_EN-US7764962675_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
      )
    } catch (error) {
      console.log("request", error)
      return Promise.reject(error)
    }
  }

  protocol.handle(scheme, protocolHander)
}
