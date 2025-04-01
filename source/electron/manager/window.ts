/**
 * @file 窗口管理
 * @description 用于存储窗口实例，方便对窗口的管理
 */
import { join } from 'node:path';
import {
  BaseWindow,
  BrowserWindow,
  type BrowserWindowConstructorOptions
} from 'electron';

function resolvePath(relUrl: string) {
  return join(__dirname, relUrl);
}

function registryMainWindowListeners(
  this: any,
  win: BrowserWindow
) {
  // win.on('closed', () => {
  //   win = null;
  // });
  console.log(this, win);
}

const DEFAULT_OPTIONS = {
  width: 800,
  height: 600,
  title: 'HuaYing',
  webPreferences: {
    // nodeIntegration: false,
    // contextIsolation: true,
    // enableRemoteModule: false,
    preload: resolvePath('../preload/index.js')
  }
};

class WindowManager {
  private _options = DEFAULT_OPTIONS;
  public static instance: WindowManager;
  public mainWindow: BrowserWindow | null = null;
  // private isClosing = false;
  private windows: Map<string, BrowserWindow | BaseWindow> =
    new Map();

  constructor(mainWindow?: BrowserWindow) {
    if (mainWindow) {
      this.mainWindow = mainWindow;
    } else {
      const window = this.createMainWindow();
      this.addWindow(window, 'main');
    }

    this.mainWindow &&
      this.registryMainWindowListeners(this.mainWindow);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new WindowManager();
    }
    return this.instance;
  }

  private createMainWindow(
    options?: BrowserWindowConstructorOptions
  ) {
    this.mainWindow = new BrowserWindow(
      options || this._options
    );
    // this.mainWindow.loadURL('http://localhost:3000');
    return this.mainWindow;
  }

  private registryMainWindowListeners =
    registryMainWindowListeners.bind(this);

  public getMainWindow() {
    return this.mainWindow;
  }

  public setMainWindow(window: BrowserWindow) {
    this.mainWindow = window;
    this.registryMainWindowListeners(this.mainWindow);
  }

  public getWindowState(name: string) {
    const window = this.getWindow(name);
    if (!window || window.isDestroyed()) {
      return {
        isMaximized: false,
        isVisible: false,
        isMinimized: false,
        isFocused: false
      };
    }

    return {
      isMaximized: window.isMaximized(),
      isVisible: window.isVisible(),
      isMinimized: window.isMinimized(),
      isFocused: window.isFocused()
    };
  }

  public addWindow(window: BrowserWindow, name: string): void {
    this.windows.set(name, window);
  }

  public getWindow(
    name: string
  ): BrowserWindow | BaseWindow | null {
    return this.windows.get(name) || null;
  }

  public deleteWindow(name: string): void {
    this.windows.delete(name);
  }

  public clearWindows(): void {
    this.windows.clear();
  }
}

console.log(WindowManager.getInstance());

export default WindowManager;
