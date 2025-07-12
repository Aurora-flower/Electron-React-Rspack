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

/**
 * @summary IPC 通信频道名称
 */
export const IPC_CHANNEL_NAME = {
  /* ***** ***** ***** ***** 窗口 ***** ***** ***** ***** */
  WINDOW_CREATE: "window-create",
  WINDOW_CLOSE: "window-close",
  WINDOW_MINIMIZE: "window-minimize",
  WINDOW_MAXIMIZE: "window-maximize",
  WINDOW_RESTORE: "window-restore",

  /* ***** ***** ***** ***** 消息通讯 ***** ***** ***** ***** */
  MESSAGE_TRANSMIT: "message-transmit"
}

export const MAIN_WINDOW_NAME = "_MAIN_"
