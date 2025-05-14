import { join } from "node:path"
import type { Mode, RspackOptions } from "@rspack/core"
import { isDev } from "../common/env"
import { getDirectoryStructure, getFileStructure } from "../common/structure"
import LOADER from "./loader"
import {
  APP_PROCESS_MODE,
  BUILD_TARGET,
  DEVTOOL,
  ENTRY_FILENAME
} from "./macro"
import PLUGINS from "./plugins"

const FILE = getFileStructure()
const DIRECTORY = getDirectoryStructure()

function sourcePath(type: string, filename: string) {
  return join(DIRECTORY.Source[type] || "", filename)
}

function singleConfig(key: string, type: string) {
  const isMain = type === APP_PROCESS_MODE.Electron
  const isPeload = type === APP_PROCESS_MODE.Preload
  const isRenderer = type === APP_PROCESS_MODE.Renderer
  const isDevelopment = isDev()

  const baseOptions: RspackOptions = {
    mode: (process.env.NODE_ENV as Mode) || "production",
    stats: "verbose",
    devtool: DEVTOOL.SourceMap,
    resolve: {
      mainFiles: ["index", "main"],
      extensions: [".ts", ".js", ".json"],
      enforceExtension: false,
      symlinks: false
    },
    module: {
      rules: [
        LOADER.JsExclude,
        LOADER.TsExclude,
        LOADER.Css,
        LOADER.Image,
        LOADER.TextExclude
      ]
    },
    plugins: [PLUGINS.CssExtract()]
  }

  const emptyObject = Object.create(null)
  const options: RspackOptions = Object.assign(emptyObject, baseOptions, {
    target: BUILD_TARGET[key],
    entry: {
      [type]: {
        import: sourcePath(
          type,
          isPeload ? ENTRY_FILENAME.Index : ENTRY_FILENAME.Main
        )
        // runtime: `${key}_runtime`
      }
    },
    output: {
      path: DIRECTORY.Output[type],
      filename: "index.js",
      // filename: `${isMain ? "main" : "index"}.js`,
      clean: true
    }
  })

  if (isMain) {
    options.resolve!.alias = {
      "@main": DIRECTORY.Source.main
    }
    options.plugins = options.plugins!.concat([PLUGINS.Env(isDevelopment)])
  }

  if (isPeload) {
    options.plugins = options.plugins!.concat([PLUGINS.Env(isDevelopment)])
  }

  if (isRenderer) {
    // options.output!.publicPath = "/"
    options.resolve!.alias = {
      "@": DIRECTORY.Source.renderer
    }
    options.resolve!.extensions = options.resolve!.extensions?.concat([
      ".tsx",
      ".css"
    ])

    options.plugins = options.plugins!.concat(
      [
        PLUGINS.Html(FILE.Page.from),
        PLUGINS.Copy([
          {
            from: DIRECTORY.Static.resource,
            to: DIRECTORY.Output.renderer
          }
        ])
      ].filter(Boolean)
    )
  }

  return options
}

function getRsConfig() {
  const flatConfig: Array<RspackOptions> = []
  for (const key in APP_PROCESS_MODE) {
    const type = APP_PROCESS_MODE[key as keyof typeof APP_PROCESS_MODE]
    const config = singleConfig(key, type)
    flatConfig.push(config)
  }
  return flatConfig
}

export default getRsConfig
