import type { RawCopyPattern } from "@rspack/binding"
import { rspack } from "@rspack/core"
import { configDotenv } from "dotenv"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { getFileStructure } from "../common/structure"

function getHtmlRspackPlugin(
  template: string
): InstanceType<typeof rspack.HtmlRspackPlugin> {
  const HtmlRspackPlugin = new rspack.HtmlRspackPlugin({
    template,
    inject: "body",
    meta: {
      // shrink-to-fit=no
      // viewport:
      //   "width=device-width, initial-scale=1.0,",
      /* Content-Security-Policy 策略 */
      "Content-Security-Policy": {
        "http-equiv": "Content-Security-Policy",
        content:
          // `default-src 'self';` +
          `script-src 'self' blob: https://pixijs.com/ ;` + // 'nonce-{{nonce}}'
          `style-src-attr 'self' 'unsafe-inline';` + // style-src style-src-attr style-src-elem
          `font-src 'self' data: https://pixijs.com/;` +
          `worker-src 'self' blob:;` +
          `connect-src 'self' data: https://api.iconify.design/ https://pixijs.com/;` +
          `img-src 'self' data: blob: https://pixijs.com/;`
      }
    },
    scriptLoading: "module",
    templateParameters: {}
  })
  return HtmlRspackPlugin
}

function getMiniCssExtractPlugin(): InstanceType<
  typeof rspack.CssExtractRspackPlugin
> {
  return new rspack.CssExtractRspackPlugin({})
}

function getHotModuleReplacementPlugin(): InstanceType<
  typeof rspack.HotModuleReplacementPlugin
> {
  return new rspack.HotModuleReplacementPlugin()
}

function getDefinePlugin(
  options = {}
): InstanceType<typeof rspack.DefinePlugin> {
  return new rspack.DefinePlugin({
    global: "globalThis",
    // global: "window",
    ...options
    // global: `(typeof globalThis !== "undefined" ? globalThis : window)` // '(typeof globalThis !== "undefined" ? globalThis : window)' | "window"
  })
}

function getEnvPlugin(
  isDev = false
): InstanceType<typeof rspack.EnvironmentPlugin> {
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

function copyPlugin(
  patterns: Pattern
): InstanceType<typeof rspack.CopyRspackPlugin> {
  return new rspack.CopyRspackPlugin({
    patterns
  })
}

function getProvidePlugin(): InstanceType<typeof rspack.ProvidePlugin> {
  return new rspack.ProvidePlugin({})
}

function getBundleAnalyzerPlugin(): InstanceType<typeof BundleAnalyzerPlugin> {
  const BundleAnalyzerPluginOption = {
    analyzerMode: "static" as const,
    reportFilename: "report.html",
    openAnalyzer: false,
    generateStatsFile: true,
    statsFilename: "stats.json"
  }
  return new BundleAnalyzerPlugin(BundleAnalyzerPluginOption)
}

const PLUGINS = {
  Html: getHtmlRspackPlugin,
  Define: getDefinePlugin,
  Env: getEnvPlugin,
  Copy: copyPlugin,
  Provide: getProvidePlugin,
  CssExtract: getMiniCssExtractPlugin,
  BundleAnalyzer: getBundleAnalyzerPlugin,
  // ReactRefresh: getReactRefreshPlugin,
  HMR: getHotModuleReplacementPlugin
}

export default PLUGINS
