import { getDomElement } from "@/features/document"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { overwritePixi } from "@/helpers/graphics/gremlin/overwrite"
import {
  initSettingsBasiskarte,
  initSettingsStaff,
  initSettingsUiLayer,
  setupLayer
} from "@/helpers/graphics/gremlin/setup/setupLayer"
import { setupStage } from "@/helpers/graphics/gremlin/setup/setupStage"
import { getSize } from "@/utils/functions/usually"
import type { Container } from "pixi.js"
import { Application } from "pixi.js"

overwritePixi()

function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string"
    ? (getDomElement(root, "selector") as HTMLElement)
    : root
}

class PixiManager {
  private static _app: Application
  static viewScale = 1
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
    })
    app.stage.hitArea = app.screen
    for (const child of domElement.children) {
      if (child.tagName === "CANVAS") child.remove()
    }
    domElement.appendChild(app.canvas)
    PixiManager.initDrawingBoard(app.stage)
    PixiManager._app = app
    return app
  }

  static getApp(): Application {
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
    if (!stage || scale < 0.25 || scale > 3) {
      return
    }
    PixiManager.viewScale = scale
    const karte = getElementByLabel(ELEMENT_FLAG.Karte, stage)
    if (karte) {
      initSettingsBasiskarte(karte, true)
      // TODO: 更新辅助元素（标尺|网格等）
    }
    const staff = getElementByLabel(ELEMENT_FLAG.Staff, stage)
    if (staff) {
      initSettingsStaff(staff, true)
    }
    const layer = getElementByLabel(ELEMENT_FLAG.Layer, stage)
    if (layer) {
      initSettingsUiLayer(layer)
    }
    console.log("缩放设置", karte, staff, layer, PixiManager._app)
  }
}

export default PixiManager
