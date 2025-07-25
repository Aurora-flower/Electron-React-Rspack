import type { PointData } from "pixi.js"
import { Application } from "pixi.js"
import { queryElement } from "@/features/document/dom-utils/query"
import { removeElementsByTag } from "@/features/document/dom-utils/remove"
import {
  DEFAULT_INIT_VIEW_SCALE,
  MAX_SCALE,
  MIN_SCALE
} from "@/helpers/graphics/gremlin/constant/defaultValue"
import { isVaildScale } from "@/helpers/graphics/gremlin/constant/helper"
import Selector from "@/helpers/graphics/gremlin/controller/selector"
import { setupPixiApp } from "@/helpers/graphics/gremlin/setup"
import { updateRenderer } from "@/helpers/graphics/gremlin/setup/setupLayer"
import { getSize } from "@/utils/functions/usually"
import { webLog } from "@/utils/log"

function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string"
    ? (queryElement(root, "selector") as HTMLElement)
    : root
}

class Gremlin {
  private static _app: Application | null = null
  static recordPivot: PointData
  static viewScale = DEFAULT_INIT_VIEW_SCALE
  static get viewSize(): SizeModel {
    const renderer = Gremlin._app?.renderer
    return getSize(renderer?.width ?? 0, renderer?.height ?? 0)
  }

  static set viewSize(size: SizeModel) {
    const app = Gremlin._app
    if (app) {
      app.renderer.resize(size.width, size.height)
    }
  }
  // new Proxy(getSize(), {
  //   get(target: SizeModel, p: keyof SizeModel, receiver): number {
  //     const app = Gremlin._app
  //     if (p === "width" || p === "height") {
  //       return app ? app.renderer?.[p] : 0
  //     }
  //     return Reflect.get(target, p, receiver)
  //   }
  // })

  /**
   * 初始化 pixi 应用程序
   * @param {HTMLElement} root 挂载元素
   * @returns {Promise<Application>} 应用实例
   */
  static async initialize(root: HTMLDivElement | string): Promise<Application> {
    const domElement = getRootElement(root)
    const app = new Application()
    await app.init({
      antialias: true,
      resizeTo: domElement
      // backgroundAlpha: 0
    })
    removeElementsByTag(domElement, "CANVAS")
    domElement.appendChild(app.canvas)
    Gremlin._app = app
    Gremlin.initDrawingBoard(app)
    return app
  }

  static get app(): Application | null {
    return Gremlin._app ?? null
  }

  /**
   * 画板样式初始化操作
   * @param app pixi 应用
   */
  static initDrawingBoard = setupPixiApp

  static isVaildScale(scale: number): boolean {
    return scale >= MIN_SCALE && scale <= MAX_SCALE
  }

  static setDrawingBoardScale(scale: number): void {
    const stage = Gremlin.app?.stage
    if (!stage || !isVaildScale(scale)) {
      return
    }
    Gremlin.viewScale = scale
    updateRenderer(stage)
    // console.log("缩放设置", karte, staff, layer, Gremlin._app)

    // TODO: 其他的更新操作
    Selector.draw()
  }

  static destroy(): void {
    Gremlin.viewScale = DEFAULT_INIT_VIEW_SCALE
    webLog("Gremlin", "destroy", Gremlin._app)
    Gremlin._app = null
  }
}

export default Gremlin
