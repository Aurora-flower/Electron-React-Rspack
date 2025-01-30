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
