import { join } from "node:path"
import type { Mode, RspackOptions } from "@rspack/core"
import { getIsDev } from "../common/env"
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

function sourcePath(sourceType: string, filename: string): string {
  return join(DIRECTORY.Source[sourceType] || "", filename)
}

function singleConfig(
  key: string,
  processType: string
): Record<string, unknown> {
  const isMain = processType === APP_PROCESS_MODE.Electron
  const isPeload = processType === APP_PROCESS_MODE.Preload
  const isRenderer = processType === APP_PROCESS_MODE.Renderer
  const isDevelopment = getIsDev()
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
      parser: {
        // asset 模块的解析器选项
        asset: {
          dataUrlCondition: {
            maxSize: 16192
          }
        },
        // javascript 模块的解析器选项
        javascript: {
          dynamicImportMode: "lazy",
          dynamicImportPrefetch: false,
          dynamicImportPreload: false,
          url: true,
          importMeta: true
        },
        // CSS 模块的解析器选项
        css: {
          namedExports: true
        },
        // css/auto 模块的解析器选项
        "css/auto": {
          namedExports: true
        },
        // css/module 模块的解析器选项
        "css/module": {
          namedExports: true
        }
      },
      rules: [
        LOADER.JsExclude,
        LOADER.TsExclude,
        LOADER.Css,
        LOADER.Image,
        LOADER.TextExclude,
        LOADER.FontExclude
      ]
    },
    plugins: []
  }

  const emptyObject = Object.create(null)
  const options: RspackOptions = Object.assign(emptyObject, baseOptions, {
    target: BUILD_TARGET[key],
    entry: {
      [processType]: {
        import: sourcePath(
          processType,
          isPeload ? ENTRY_FILENAME.Index : ENTRY_FILENAME.Main
        )
        // runtime: `${key}_runtime`
      }
    },
    output: {
      path: DIRECTORY.Output[processType],
      filename: "index.js",
      // filename: `${isMain ? "main" : "index"}.js`,
      clean: true
      // globalObject: "this"
    }
  })

  if (isMain) {
    options.resolve!.alias = {
      "@main": DIRECTORY.Source.main
    }
    // options.externals = []
  }

  if (isMain || isPeload) {
    options.plugins = options.plugins!.concat([PLUGINS.Env(isDevelopment)])
  }

  if (isRenderer) {
    options.experiments = {
      css: true
    }
    options.output!.publicPath = "/"
    options.resolve!.alias = {
      "@": DIRECTORY.Source.renderer
    }
    options.resolve!.extensions = options.resolve!.extensions?.concat([
      ".tsx",
      ".css"
    ])
    // options.externals = ["primereact"]
    options.plugins = options.plugins!.concat(
      [
        PLUGINS.Html(FILE.Page.from),
        PLUGINS.Copy([
          {
            from: DIRECTORY.Static.resource,
            to: DIRECTORY.Output.renderer
          }
        ]),
        PLUGINS.CssExtract()
        // PLUGINS.BundleAnalyzer(),
      ].filter(Boolean)
    )
  }

  return options
}

function getRsConfig(): RspackOptions[] {
  const flatConfig: Array<RspackOptions> = []
  for (const key in APP_PROCESS_MODE) {
    const type = APP_PROCESS_MODE[key as keyof typeof APP_PROCESS_MODE]
    const config = singleConfig(key, type)
    flatConfig.push(config)
  }
  return flatConfig
}

export default getRsConfig
