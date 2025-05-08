/// <reference types="./electron/app.d.ts" />
/// <reference types="./shims.d.ts" />

declare global {
  /* ***** ***** ***** ***** Window 类型定义扩展 ***** ***** ***** ***** */
  interface Window {
    IPC: {
      emitter: (channel: string, ...args: unknown[]) => Promise<unknown>
      dispatch: (channel: string, ...args: unknown[]) => Promise<unknown>
      // post: () => void
    }
  }

  interface AppInfoModel {
    /* 应用信息 */
    name: string
    /* 应用路径 */
    appFolder: string
    /*应用路径 - 未解压 */
    appUnpackFolder: string
    /* 文件分隔符*/
    sep: string
    /* 当前工作目录 */
    cwd: string
    /* 驱动盘 */
    driveLetter: string
    /* 是否 windows 系统 */
    win32: boolean
    /* 系统版本 */
    version: string
    /* 系统平台 */
    platform: string
    /* 是否打包 */
    packaged: boolean
    /* 路径 */
    paths: Record<AppPathTypes, string>
    /* 核心目录 */
    core: string
    /* 工作空间路径 */
    workspace: string
  }

  type InvokeChannelName = string
  type SenderChannelName = string
  type ChannelName = SenderChannelName | InvokeChannelName

  interface Message {
    type: string
    data: unknown
    isJson?: boolean
  }

  type ObjectType<T> = {
    [key: string]: T
  }
}

export {}
