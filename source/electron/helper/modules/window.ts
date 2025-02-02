import { debugLog } from '@/common/log';
import { BrowserWindow } from 'electron';

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
