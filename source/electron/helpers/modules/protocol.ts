import { errorMessage } from "@main/utils/error";
import { app, net, protocol } from "electron";
import { normalize } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_SCHEMA = "local"; // 本地文件访问

export function privilegedSchemes(
  scheme: string = DEFAULT_SCHEMA,
  options?: Array<Electron.CustomScheme>
) {
  let _option: Array<Electron.CustomScheme> = options || [];
  if (scheme) {
    const defaultOption: Electron.CustomScheme = {
      scheme,
      privileges: {
        bypassCSP: true,
        standard: true,
        secure: true,
        supportFetchAPI: true
      }
    };
    const mergeOption = Object.assign(defaultOption, options);
    _option = [mergeOption];
  }
  protocol.registerSchemesAsPrivileged(_option);
}

export function registerProtocolHandle(scheme: string = DEFAULT_SCHEMA) {
  if (typeof scheme !== "string" || scheme.trim() === "") {
    return new Error("scheme must be a string and not empty.");
  }

  async function protocolHander(
    request: GlobalRequest
  ): Promise<GlobalResponse> {
    if (!request.url.startsWith(`${scheme}://`)) {
      return Promise.reject(new Error("Invalid request URL."));
    }
    try {
      // const filePath = request.url.replace(`${scheme}:/`, "");
      // const fileURL = pathToFileURL(decodeURI(filePath)).toString();
      //   try {
      //     // return await net.fetch(fileURL);
      //     return await net.fetch("file:///F:/SERVER/release/ER/sample.png");
      //   } catch (error) {
      //     return Promise.reject(errorMessage(error));
      //   }
      return await net.fetch(request.url);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protocol.handle(scheme, protocolHander);

  // protocol.handle(scheme, (request) => {
  //   const filePath = request.url.slice(`{scheme}://`.length);
  //   return net.fetch(pathToFileURL(join(__dirname, filePath)).toString());
  // });
}
