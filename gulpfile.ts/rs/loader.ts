/**
 * @file Loader 处理配置
 */
import { rspack } from "@rspack/core"

/* ***** ***** ***** ***** Rules ***** ***** ***** ***** */
const NODE_MODULES = /node_modules/

/* ***** ***** ***** ***** Parser ***** ***** ***** ***** */
const JS_PARSER_OPTIONS = {
  // @babel/core
  loader: "babel-loader",
  options: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  }
}

const TS_PARSER_OPTIONS = {
  loader: "ts-loader",
  options: {
    transpileOnly: true,
    happyPackMode: true
  }
}

/* ***** ***** ***** ***** Loader ***** ***** ***** ***** */
function getImageLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[contenthash].[ext]",
          outputPath: "images"
        }
      }
    ],
    exclude: isExclude ? exclude : undefined
  }
  return options
}

function getCssLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.css$/,
    use: [
      rspack.CssExtractRspackPlugin.loader,
      // {
      //   loader: 'style-loader'
      // },
      {
        loader: "css-loader",
        options: {
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
    exclude: isExclude ? exclude : undefined
  }
  return options
}

function getJsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.jsx?$/,
    use: [JS_PARSER_OPTIONS],
    exclude: isExclude ? exclude : undefined
  }
  return options
}

function getTsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.tsx?$/,
    use: [JS_PARSER_OPTIONS, TS_PARSER_OPTIONS],
    exclude: isExclude ? exclude : undefined
  }
  return options
}

const LOADER = {
  Js: getJsLoader(),
  JsExclude: getJsLoader(true),
  Ts: getTsLoader(),
  TsExclude: getTsLoader(true),
  Css: getCssLoader(),
  CssExclude: getCssLoader(true),
  Image: getImageLoader(),
  ImageExclude: getImageLoader(true)
}

export default LOADER
