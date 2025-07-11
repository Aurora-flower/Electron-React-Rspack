import type { WatchOptions } from "@rspack/core"
import { rspack } from "@rspack/core"
import { getIsDev } from "../common/env"
import getRsConfig from "./config"

const ignored = [
  /* ***** ***** ***** ***** Folder ***** ***** ***** ***** */
  "**/node_modules/**",
  "**/gulpfile.ts/**",
  "**/.idea/**",
  "**/.github/**",
  "**/.husky/**",
  "**/.vscode/**",
  "**/.git/**",
  "**/.husky/**",
  "**/test/**",
  "**/app/**",
  "**/core/**",
  "**/.cache/**",

  /* ***** ***** ***** ***** File ***** ***** ***** ***** */
  "**/.hintrc",
  "**/.npmrc",
  "**/LICENSE*",
  "**/*.md",
  "**/*.git*",
  "**/*.yml",
  "**/*.config.js",
  "**/*.config.mjs",
  "**/tsconfig.*.json",
  "**/tsconfig.json",
  "**/package.json",
  "**/package-lock.json"
]

function rspackCompiler(isClosing = false): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const RsConfig = getRsConfig()
    try {
      const options: WatchOptions = {
        ignored
        // poll: 1000 * 3
      }
      const multiCompiler = rspack(RsConfig)
      multiCompiler.watch(options, (err, stats) => {
        /* Tip📢: err 对象不包含编译错误，必须使用 stats.hasErrors() 单独处理 */
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
        console.log(
          "[Rspack Compiling...]",
          new Date().toLocaleTimeString(),
          getIsDev()
        )
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
        err instanceof Error ? err.message : err
      )
      reject(err)
    }
  })
}

export default rspackCompiler
