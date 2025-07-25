/* 默认协议访问 - 本地文件访问 */
export const DEFAULT_SCHEMA = "local"

/* 客户端协议访问 */
export const CLIENT_SCHEMA = "huaying"

/* extensions 文件类型 */
export const FILE_EXTENSIONS_CATEGORY = {
  Image: [".jpg", ".png"],
  // Media
  Media: [
    /* ***** ***** ***** ***** Video ***** ***** ***** ***** */
    ".mp4",
    ".mov",

    /* ***** ***** ***** ***** Audio ***** ***** ***** ***** */
    ".mp3"
  ],
  Script: [".js", ".jsx", ".ts", ".tsx"],
  Json: [".json", ".json5"]
}

export const MAIN_WINDOW_NAME = "_MAIN_"
