/**
 * @file Loader 处理配置
 */
import { rspack } from "@rspack/core"
// import { ENVIRONMENT } from "../common/env"

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
    // cacheDirectory: true,
    // cacheCompression: false,
    // compact: false
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
    test: /\.(png|jpe?g|gif)$/,
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

function getSvgLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
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
    // type: "css",
    exclude: isExclude ? exclude : undefined
  }
  return options
}

// const isDev = process.env.NODE_ENV === ENVIRONMENT.Dev

function getJsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.jsx?$/,
    // use: [JS_PARSER_OPTIONS],
    type: "javascript/auto",
    exclude: isExclude ? exclude : undefined
  }
  return options
}

function getTsLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.tsx?$/,
    use: [
      // {
      //   loader: "builtin:swc-loader",
      //   options: {
      //     jsc: {
      //      // parser: {
      //      //   syntax: "ecmascript",
      //      //   jsx: true
      //      // },
      //       parser: {
      //         syntax: "typescript",
      //         tsx: true
      //       },
      //       transform: {
      //         react: {
      //           runtime: "automatic",
      //           development: isDev,
      //           refresh: isDev
      //         },
      //         optimizer: {
      //           simplify: true
      //         }
      //       }
      //     }
      //   }
      // },
      JS_PARSER_OPTIONS,
      TS_PARSER_OPTIONS
    ],
    exclude: isExclude ? exclude : undefined
  }
  return options
}

function getTextLoader(isExclude = false, exclude = NODE_MODULES) {
  const options = {
    test: /\.(pem|txt)$/,
    type: "asset/source",
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
  ImageExclude: getImageLoader(true),
  Svg: getSvgLoader(),
  SvgExclude: getSvgLoader(true),
  Text: getTextLoader(),
  TextExclude: getTextLoader(true)
}

export default LOADER
