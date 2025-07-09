import { join } from "node:path"
import { defineConfig } from "@rspack/cli"
import { rspack } from "@rspack/core"
import { configDotenv } from "dotenv"

const ReactRefreshRspackPlugin = require("@rspack/plugin-react-refresh")

const isDev = process.env.NODE_ENV === "development"

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"]

console.log("http://192.168.3.71:8080/", __dirname)

const joinPath = (...paths: string[]): string => join(__dirname, ...paths)

const ScriptLoader = {
  test: /\.(jsx?|tsx?)$/,
  use: [
    {
      loader: "builtin:swc-loader",
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true
          },
          transform: {
            react: {
              runtime: "automatic",
              development: isDev,
              refresh: isDev
            }
          }
        },
        env: { targets }
      }
    }
  ],
  exclude: /node_modules/
}

const CssLoader = {
  test: /\.css$/,
  use: [
    rspack.CssExtractRspackPlugin.loader,
    // {
    //   loader: 'style-loader'
    // },
    {
      loader: "css-loader",
      options: {
        // modules: false,
        happyPackMode: true
      }
    },
    {
      loader: "postcss-loader"
      // options: {
      //   postcssOptions: {
      //     config: './postcss.config.js'
      //   }
      // }
    }
  ],
  options: {
    modules: true
  },
  type: "javascript/auto",
  exclude: /node_modules/
}

const EnvPlugin = (): InstanceType<typeof rspack.EnvironmentPlugin> => {
  const envPath = joinPath("./.config/.env")
  configDotenv({ path: envPath })
  if (isDev) {
    configDotenv({ path: `${envPath}.dev` })
  } else {
    configDotenv({ path: `${envPath}.prod` })
  }
  return new rspack.EnvironmentPlugin({
    ...process.env
  })
}

// new rspack.DefinePlugin({
//   "process.env.NODE_ENV": JSON.stringify(
//     process.env.NODE_ENV || "development"
//   )
// })

export default defineConfig([
  {
    mode: "development",
    // stats: "verbose",
    devtool: "source-map",
    resolve: {
      mainFiles: ["index", "main"],
      extensions: ["...", ".ts", ".js", ".json", ".node"],
      enforceExtension: false,
      symlinks: false,
      alias: {
        "@main": joinPath("./source/electron")
      }
    },
    target: "electron-main",
    entry: {
      main: {
        import: joinPath("./source/electron/main.ts")
      }
    },
    output: {
      path: joinPath("./app/electron"),
      filename: "index.js",
      clean: true
    },
    module: {
      rules: [ScriptLoader]
    },
    plugins: [EnvPlugin()],
    externals: ["express"]
  },
  {
    mode: "development",
    // stats: "verbose",
    devtool: "source-map",
    resolve: {
      mainFiles: ["index", "main"],
      extensions: ["...", ".ts", ".js", ".json", ".node"],
      enforceExtension: false,
      symlinks: false
    },
    target: "electron-preload",
    entry: {
      preload: {
        import: joinPath("./source/preload/index.ts")
      }
    },
    output: {
      path: joinPath("./app/preload"),
      filename: "index.js",
      clean: true
    },
    module: {
      rules: [ScriptLoader]
    },
    plugins: [
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            "from": joinPath("./public/resource"),
            "to": joinPath("./app/public")
          }
          // {
          //   "from": joinPath("./core"),
          //   "to": joinPath("./app/core")
          // }
        ]
      }),
      EnvPlugin()
    ]
  },
  {
    mode: "development",
    // stats: "verbose",
    devtool: "source-map",
    resolve: {
      mainFiles: ["index", "main"],
      extensions: ["...", ".ts", ".js", ".json", ".node", ".tsx", ".css"],
      enforceExtension: false,
      symlinks: false,
      alias: {
        "@": joinPath("./source/web")
      }
    },
    target: "electron-renderer",
    entry: {
      renderer: {
        import: joinPath("./source/web/main.ts")
      }
    },
    output: {
      path: joinPath("./app/public"),
      filename: "index.js",
      clean: true,
      publicPath: "/"
    },
    experiments: {
      css: true
    },
    infrastructureLogging: {
      level: "verbose"
    },
    optimization: {
      minimizer: [
        new rspack.SwcJsMinimizerRspackPlugin(),
        new rspack.LightningCssMinimizerRspackPlugin({
          minimizerOptions: { targets }
        })
      ]
    },
    module: {
      rules: [ScriptLoader, CssLoader]
    },
    node: {
      global: false,
      __filename: false,
      __dirname: false
    },
    plugins: [
      new rspack.HtmlRspackPlugin({
        template: joinPath("./public/index.html"),
        inject: "body",
        meta: {
          "Content-Security-Policy": {
            "http-equiv": "Content-Security-Policy",
            "content":
              "script-src 'self' blob: https://pixijs.com/ ;style-src-attr 'self' 'unsafe-inline';font-src 'self' data: https://pixijs.com/;worker-src 'self' blob:;connect-src 'self' data: https://api.iconify.design/ https://pixijs.com/;img-src 'self' data: blob: https://pixijs.com/;"
          }
        },
        scriptLoading: "module",
        templateParameters: {}
      }),
      new rspack.CssExtractRspackPlugin({}),
      isDev ? new ReactRefreshRspackPlugin() : null
    ].filter(Boolean)
  }
])
