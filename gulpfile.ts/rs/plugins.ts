import type { RawCopyPattern } from "@rspack/binding"
import { rspack } from "@rspack/core"
import { configDotenv } from "dotenv"
import { getFileStructure } from "../common/structure"
// const ReactRefreshPlugin = require("@rspack/plugin-react-refresh")

function getHtmlRspackPlugin(template: string) {
  const HtmlRspackPlugin = new rspack.HtmlRspackPlugin({
    template,
    inject: "body",
    meta: {
      // shrink-to-fit=no
      viewport:
        "width=device-width, initial-scale=1.0," +
        "maximum-scale=1.0, user-scalable=no",
      /* Content-Security-Policy 策略 */
      "Content-Security-Policy": {
        "http-equiv": "Content-Security-Policy",
        content:
          // `default-src 'self';` +
          `script-src 'self' blob:;` +
          `style-src-attr 'self';` + // style-src style-src-attr style-src-elem
          `font-src 'self';` +
          `worker-src 'self' blob:;` +
          `connect-src 'self' https://api.iconify.design/ data:;` +
          `img-src 'self' data: blob:;`
      }
    }
  })
  return HtmlRspackPlugin
}

function getMiniCssExtractPlugin() {
  return new rspack.CssExtractRspackPlugin({})
}

// function getReactRefreshPlugin() {
//   return new ReactRefreshPlugin()
// }

// function getHotModuleReplacementPlugin() {
//   return new rspack.HotModuleReplacementPlugin()
// }

function getDefinePlugin(options = {}) {
  return new rspack.DefinePlugin({
    ...options
    // global: `(typeof globalThis !== "undefined" ? globalThis : window)` // '(typeof globalThis !== "undefined" ? globalThis : window)' | "window"
  })
}

function getEnvPlugin(isDev = false) {
  const FILE = getFileStructure()
  configDotenv({ path: FILE.Env.from })
  if (isDev) {
    configDotenv({ path: `${FILE.Env.from}.dev` })
  } else {
    configDotenv({ path: `${FILE.Env.from}.prod` })
  }
  return new rspack.EnvironmentPlugin({
    // DEV_SERVER_URL: process.env.DEV_SERVER_URL ?? ""
    ...process.env
  })
}

type Pattern = (
  | string
  | ({
      from: string
    } & Partial<RawCopyPattern>)
)[]

function copyPlugin(patterns: Pattern) {
  return new rspack.CopyRspackPlugin({
    patterns
  })
}

function getProvidePlugin() {
  return new rspack.ProvidePlugin({})
}

const PLUGINS = {
  Html: getHtmlRspackPlugin,
  Define: getDefinePlugin,
  Env: getEnvPlugin,
  Copy: copyPlugin,
  Provide: getProvidePlugin,
  CssExtract: getMiniCssExtractPlugin
  // ReactRefresh: getReactRefreshPlugin,
  // HotModuleReplacement: getHotModuleReplacementPlugin
}

export default PLUGINS
