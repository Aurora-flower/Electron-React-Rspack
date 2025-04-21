declare global {
  /* ***** ***** ***** ***** Window 类型定义扩展 ***** ***** ***** ***** */
  interface Window {
    IPC: {
      emitter: (channel: string, ...args: any[]) => Promise<any>;
      dispatch: (channel: string, ...args: any[]) => Promise<any>;
    };
  }
}

export {};
