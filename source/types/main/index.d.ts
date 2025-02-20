/* ***** ***** ***** ***** 主进程的类型定义 ***** ***** ***** ***** */
declare namespace MainProcess {
  /* Eelectron app Api 的属性 */
  export type AppProperty =
    | 'accessibilitySupportEnabled'
    | 'applicationMenu'
    | 'badgeCount'
    | 'commandLine'
    | 'dock'
    | 'isPackaged'
    | 'name'
    | 'userAgentFallback'
    | 'runningUnderARM64Translation';

  /**
   * @summary app.getPath 应用路径支持的类型
   * @see {@link https://www.electronjs.org/docs/helper/app#appgetpathname | Electron App getPath}
   */
  export type PathNames =
    | 'home'
    | 'appData'
    | 'userData'
    | 'sessionData'
    | 'temp'
    | 'exe'
    | 'module'
    | 'desktop'
    | 'documents'
    | 'downloads'
    | 'music'
    | 'pictures'
    | 'videos'
    | 'recent'
    | 'logs';

  /* createWindow 方法 - 创建窗口的参数 */
  export interface WindowParams {
    /* 是否开启调试模式 - openTools */
    debug?: boolean;

    /* 是否为远程地址窗口 */
    isRemote?: boolean;

    /* 是否设置最小窗口宽高 */
    minize?: {
      width: number;
      height: number;
    };
  }
}
