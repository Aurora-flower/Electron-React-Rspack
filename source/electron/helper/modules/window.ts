import { debugLog } from '@/common/helper/log';
import { BrowserWindow, BaseWindow } from 'electron';

/**
 * 获取窗口的个数
 * @returns {number} 返回窗口的个数
 */
export function getWindowCount(): number {
  return BrowserWindow.getAllWindows()?.length;
}

/**
 * 获取当前聚焦的窗口
 * @returns {BrowserWindow | BaseWindow} 返回当前聚焦的窗口实例
 */
export function getFocusedWindow():
  | BrowserWindow
  | BaseWindow
  | null {
  return BrowserWindow.getFocusedWindow();
}

/**
 * 获取 webcontent 对应的窗口实例
 * @param webContent webcontent 对象
 * @returns {BrowserWindow} 返回 webcontent 对应的窗口实例
 */
export function getWebContentsWindow(
  webContents: Electron.WebContents
): BrowserWindow | null {
  // BrowserWindow.getAllWindows().find(win => win.webContents.getURL() === url);
  return BrowserWindow.fromWebContents(webContents);
}

/**
 * @summary 创建窗口
 * @param {string} url - 窗口地址
 * @param {Electron.BrowserWindowConstructorOptions} options - 窗口配置
 * @param {MainProcess.WindowParams} params - 窗口参数
 * @returns {Electron.BrowserWindow} - 窗口实例
 */
export function createWindow(
  url: string,
  options: Electron.BrowserWindowConstructorOptions | null = null,
  params: MainProcess.WindowParams = {}
): Electron.BrowserWindow | null {
  try {
    if (
      !options ||
      typeof options !== 'object' ||
      Object.keys(options).length === 0
    ) {
      options = {
        webPreferences: {
          nodeIntegration: true
        }
      };
    }

    const win = new BrowserWindow(options);

    /* 加载地址 */
    params?.isRemote ? win.loadURL(url) : win.loadFile(url);

    /* 设置调试模式 */
    params?.debug &&
      win.webContents.openDevTools({ mode: 'detach' });

    /* 设置最小尺寸 */
    if (params?.minize) {
      win.setMinimumSize(
        params.minize.width,
        params.minize.height
      );
    }

    return win;
  } catch (error: unknown) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred!';
    debugLog(module.id, 'createWindow', true, msg);
    // AppMessageDistributor.showErrorBox(
    //   'Failed to create main window',
    //   msg
    // );
    return null;
  }
}
