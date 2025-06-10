/// <reference types="./electron/app.d.ts" />
/// <reference types="./shims.d.ts" />
/// <reference types="./channel.d.ts" />

declare global {
  /* ***** ***** ***** ***** Window 类型定义扩展 ***** ***** ***** ***** */
  interface Window {
    IPC: {
      emitter: (
        channel: ReceiverChannelName,
        ...args: unknown[]
      ) => Promise<unknown>
      dispatch: (
        channel: TriggerChannelName,
        ...args: unknown[]
      ) => Promise<unknown>
      sender: (channel: MessagenerChannelName, ...args: unknown[]) => void
    }
  }

  /* ***** ***** ***** ***** 全局类型定义 ***** ***** ***** ***** */

  /**
   * @summary 应用信息
   */
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
    /* 是否为开发环境 */
    isDev: boolean
  }

  type Cursor =
    | "auto"
    | "default"
    | "none"
    | "context-menu"
    | "help"
    | "pointer"
    | "progress"
    | "wait"
    | "cell"
    | "crosshair"
    | "text"
    | "vertical-text"
    | "alias"
    | "copy"
    | "move"
    | "no-drop"
    | "not-allowed"
    | "e-resize"
    | "n-resize"
    | "ne-resize"
    | "nw-resize"
    | "s-resize"
    | "se-resize"
    | "sw-resize"
    | "w-resize"
    | "ns-resize"
    | "ew-resize"
    | "nesw-resize"
    | "col-resize"
    | "nwse-resize"
    | "row-resize"
    | "all-scroll"
    | "zoom-in"
    | "zoom-out"
    | "grab"
    | "grabbing"

  /* ***** ***** ***** ***** 常用的类型定义 ***** ***** ***** ***** */
  type ObjectType<T = unknown> = {
    [key: string]: T
  }

  type RecordType<T = unknown> = Record<string, T>

  type NumberArray = Array<number>
  type StringArray = Array<string>
  type ObjectArray<T = unknown> = Array<ObjectType<T>>

  type Constructor<T = unknown> = new (...args: unknown[]) => T

  type AnyModel = AtWill

  interface PointModel {
    x: number
    y: number
  }

  interface SizeModel {
    width: number
    height: number
  }

  interface SpaceModel {
    horizontal: number
    vertical: number
  }

  interface PaddingModel {
    left: number
    right: number
    top: number
    bottom: number
  }

  interface MovePointModel {
    from: PointModel
    to: PointModel
  }

  type ScaleModel = PointModel
  type AnchorModel = PointModel
  type IntervalModel = PointModel
  type LinePointModel = MovePointModel
  type BoundsModel = SizeModel & PaddingModel
}

/* ***** ***** ***** ***** 类型扩展覆盖 ***** ***** ***** ***** */
declare module "pixi.js" {
  interface Texture {
    /**
     * 自动裁剪纹理透明区域
     * @returns 返回裁剪后的新纹理
     */
    autoCrop(): Promise<Texture>
  }

  interface Container {
    /**
     * 获取容器的边界
     * @returns 返回边界
     */
    // getBounds(): BoundsModel

    /**
     * @summary 是否刷新 container
     */
    isRefresh: boolean
  }
}
export {}
