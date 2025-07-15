import type { Container, PointData } from "pixi.js"
import { Application } from "pixi.js"
import { queryElement } from "@/features/document/dom-utils/query"
import { removeElementsByTag } from "@/features/document/dom-utils/remove"
import { DEFAULT_INIT_VIEW_SCALE } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Selector from "@/helpers/graphics/gremlin/controller/selector"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { setupApp } from "@/helpers/graphics/gremlin/setup/setupApp"
import {
  setupLayer,
  updateBasiskarte,
  updateLayer,
  updateStaff
} from "@/helpers/graphics/gremlin/setup/setupLayer"
import { setupStage } from "@/helpers/graphics/gremlin/setup/setupStage"
import { getSize } from "@/utils/functions/usually"
import { webLog } from "@/utils/log"

function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string"
    ? (queryElement(root, "selector") as HTMLElement)
    : root
}

const MAX_SCALE = 3
const MIN_SCALE = 0.5

class PixiManager {
  private static _app: Application | null = null
  static recordPivot: PointData
  static viewScale = DEFAULT_INIT_VIEW_SCALE
  static viewSize: SizeModel = new Proxy(getSize(), {
    get(target: SizeModel, p: keyof SizeModel, receiver): number {
      const app = PixiManager._app
      if (p === "width" || p === "height") {
        return app ? app.renderer?.[p] : 0
      }
      return Reflect.get(target, p, receiver)
    }
  })

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
    PixiManager.initDrawingBoard(app.stage)
    PixiManager._app = app
    setupApp(app)
    return app
  }

  static getApp(): Application | null {
    return PixiManager._app ?? null
  }

  /**
   * 画板样式初始化操作
   * @param stage 舞台或者容器
   */
  static initDrawingBoard(stage: Container): void {
    if (!stage) {
      return
    }
    setupLayer(stage)
    setupStage(stage)
  }

  static setDrawingBoardScale(scale: number): void {
    const stage = PixiManager.getApp()?.stage
    if (!stage || scale < MIN_SCALE || scale > MAX_SCALE) {
      return
    }
    PixiManager.viewScale = scale

    const karte = getElementByLabel(ELEMENT_FLAG.Karte, stage)
    if (karte) {
      updateBasiskarte(karte)
    }
    const staff = getElementByLabel(ELEMENT_FLAG.Staff, stage)
    if (staff) {
      updateStaff(staff)
    }
    const layer = getElementByLabel(ELEMENT_FLAG.Layer, stage)
    if (layer) {
      updateLayer(layer)
    }
    // console.log("缩放设置", karte, staff, layer, PixiManager._app)

    // TODO: 其他的更新操作
    Selector.draw()
  }

  static destroy(): void {
    PixiManager.viewScale = DEFAULT_INIT_VIEW_SCALE
    webLog("PixiManager", "destroy", PixiManager._app)
    PixiManager._app = null
  }
}

export default PixiManager
