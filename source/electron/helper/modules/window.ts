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
 * @remarks
 * - 在 app 模块 `emitted ready` 事件之前，不能使用此模块
 * - BrowserWindow 类暴露了各种方法来修改应用窗口的外观和行为。
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

    /**
     * @summary 用于优化窗口加载的视觉体验
     * @remarks
     *  - 触发时机:
     *      当窗口的网页内容首次完成渲染（即 DOM 和样式已加载并准备好显示）时触发。此时窗口虽然已创建，但可能尚未显示。
     *  - 核心用途:
     *      避免窗口在加载过程中出现白屏或未渲染内容的闪烁现象。通过延迟窗口显示，直到内容完全准备好后再展示给用户。
     *  - 对比其他事件:
     *    - `ready-to-show`: 触发于窗口内容首次完成渲染, 用于优化显示时机，避免白屏；
     *    - `did-finish-load`: 触发于页面资源（HTML/CSS/JS）加载完成, 用于执行与资源加载完成后的逻辑；
     *    - `dom-ready`: 触发于DOM 解析完成（可能样式未渲染）, 用于操作 DOM 元素；
     *  - 优先使用 once 而非 on
     *      因为 ready-to-show 只需要触发一次（首次渲染完成），使用 win.once() 避免内存泄漏。
     */
    // win.once('ready-to-show', () => {
    //   win.show(); /* 内容准备就绪后再显示窗口 */
    // });

    /**
     * @summary 忽略窗口内的所有鼠标事件
     * @description 在此窗口中发生的所有鼠标事件将被传递到此窗口下面的窗口, 但如果此窗口具有焦点, 它仍然会接收键盘事件
     * @remarks
     * - （提示）禁用上下文菜单
     *    在某些平台上, 可拖拽区域将被视为 `non-client frame`, 因此当右键单击它时, 系统菜单将弹出。
     *    要使上下文菜单在所有平台上都正确运行, 永远也不要在可拖拽区域上使用自定义上下文菜单。
     */
    // win.setIgnoreMouseEvents(true);

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
