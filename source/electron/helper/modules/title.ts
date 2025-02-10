/**
 * @file 窗口标题相关
 */
import { getWebContentsWindow } from './window';

/**
 * 设置窗口标题
 * @param event IPC 事件对象
 * @param title 标题
 */
export function setWindowTitle(
  event: Electron.IpcMainEvent,
  title: string
) {
  /* 从事件对象中获取发送消息的 webContents */
  const webContents = event.sender;

  /* 根据给定的 webContents 对象返回对应的 BrowserWindow 实例。 */
  const win = getWebContentsWindow(webContents);

  /* 设置窗口标题 */
  win && win.setTitle(title);
}
