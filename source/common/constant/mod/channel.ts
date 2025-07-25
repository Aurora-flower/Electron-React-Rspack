/**
 * @file 通讯相关的常量 - Communication Constants
 */

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
