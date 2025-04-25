/// <reference types="./electron/app.d.ts" />

declare global {
  /* ***** ***** ***** ***** Window 类型定义扩展 ***** ***** ***** ***** */
  interface Window {
    IPC: {
      emitter: (channel: string, ...args: unknown[]) => Promise<unknown>;
      dispatch: (channel: string, ...args: unknown[]) => Promise<unknown>;
    };
  }

  interface AppInfo {
    name: string;
    appFolder: string;
    appUnpackFolder: string;
    sep: string;
    win32: boolean;
    version: string;
    platform: string;
    packaged: boolean;
    paths: Record<AppPathTypes, string>;
    core: string;
    workspace: string;
  }
}

export {};
