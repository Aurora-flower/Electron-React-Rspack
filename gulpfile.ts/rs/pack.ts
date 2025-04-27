import { type WatchOptions, rspack } from "@rspack/core"
import { isDev } from "../common/env"
import getRsConfig from "./config"

function rspackCompiler(isClosing = false) {
  return new Promise((resolve, reject) => {
    const RsConfig = getRsConfig()
    try {
      const options: WatchOptions = {}
      const multiCompiler = rspack(RsConfig)
      multiCompiler.watch(options, (err, stats) => {
        /* Tip: err 对象不包含编译错误，必须使用 stats.hasErrors() 单独处理 */
        if (err) {
          console.error("[Rspack Watch Error]", err?.stack || err?.message)
          reject(err)
          return
        }
        if (stats?.hasErrors()) {
          const json = stats.toString({ colors: true })
          // const json = stats.toJson({
          //   colors: true,
          //   all: false,
          //   errors: true,
          //   warnings: true,
          //   logging: "error",
          // }); // json.errors
          console.error("[Rspack Build Error]", json)
          reject(json)
          return
        }
        resolve(true)
        console.log("[Rspack Compiling...]", isDev())
      })
      if (isClosing) {
        multiCompiler.close(err => {
          if (err) {
            console.error("[Rspack Close]", err?.stack || err?.message)
            reject(err)
            return
          }
          console.log("[Rspack Closed]")
          resolve(true)
        })
      }
    } catch (err) {
      console.error(
        "[Rspack Compile Error]",
        err instanceof Error ? err.message : String(err)
      )
      reject(err)
    }
  })
}

export default rspackCompiler
