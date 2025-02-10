/**
 * @file 应用进度条相关
 */
import {
  getFocusedWindow,
  getWebContentsWindow
} from './window';

/**
 * 设置进度条
 * @param progress 进度值，取值范围：0-1
 * @param window 窗口实例
 * @remarks
 * 在 Windows 上，每个窗口都可以有自己的进度条，而在 macOS 和 Linux（unity桌面）上，同一个应用程序只能有一个进度条。
 *
 * Tip:
 * 将参数设置为负值 (例如， -1) 将删除progress bar。
 * 设定值大于 1 在 Windows 中将表示一个不确定的进度条 ，或在其他操作系统中显示为 100%。
 */
export function setProgress(
  event: Electron.IpcMainEvent,
  progress: number,
  window?: Electron.BrowserWindow
) {
  const webContents = event.sender; // 发送该命令的 webContents 实例
  const win =
    window ||
    getFocusedWindow() ||
    (getWebContentsWindow(
      webContents
    ) as Electron.BrowserWindow);
  win.setProgressBar(progress);
}
