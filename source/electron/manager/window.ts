/**
 * @file 用于存储窗口实例，方便对窗口的管理
 */
export class WindowManager {
  public mainWindow:
    | Electron.BrowserWindow
    | Electron.BaseWindow
    | null = null;
  private windows: Map<
    string,
    Electron.BrowserWindow | Electron.BaseWindow
  > = new Map();
  private static instance: WindowManager;

  public static getInstance(): WindowManager {
    if (!this.instance) {
      this.instance = new WindowManager();
    }
    return this.instance;
  }

  private constructor(
    mainWindow?: Electron.BrowserWindow | Electron.BaseWindow
  ) {
    if (mainWindow) {
      this.mainWindow = mainWindow;
    }
  }

  public addWindow(
    window: Electron.BrowserWindow | Electron.BaseWindow,
    name: string,
    isMainWindow: boolean = false
  ): void {
    /* 重置 mainWindow */
    if (isMainWindow) {
      this.mainWindow = window;
    } else {
      this.windows.set(name, window);
    }
  }

  public getWindow(
    name: string
  ): Electron.BrowserWindow | Electron.BaseWindow | null {
    return this.windows.get(name) || null;
  }

  public deleteWindow(name: string): void {
    this.windows.delete(name);
  }
}
