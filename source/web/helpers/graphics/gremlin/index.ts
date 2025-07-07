import { getDomElement } from "@/features/document"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { overwritePixi } from "@/helpers/graphics/gremlin/overwrite"
import {
  initSettingsUiLayer,
  setupLayer
} from "@/helpers/graphics/gremlin/setup/setupLayer"
import { setupStage } from "@/helpers/graphics/gremlin/setup/setupStage"
import { getSize } from "@/utils/functions/usually"
import { webLog } from "@/utils/log"
// import { timeStamp } from "console"
import type { Container } from "pixi.js"
import { Application } from "pixi.js"

overwritePixi()

function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string"
    ? (getDomElement(root, "selector") as HTMLElement)
    : root
}

class PixiManager {
  // static isInit = false
  private static _instance: PixiManager
  private static _app: Application = new Application()
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

  // constructor() {
  // }

  static getInstance(): PixiManager {
    if (!PixiManager._instance) {
      PixiManager._instance = new PixiManager()
    }
    return PixiManager._instance
  }

  /**
   * 初始化 pixi 应用程序
   * @param {HTMLElement} root 挂载元素
   * @returns {Promise<Application>} 应用实例
   */
  async initialize(root: HTMLDivElement | string): Promise<Application> {
    const domElement = getRootElement(root)
    const app = PixiManager._app
    if (!app?.renderer) {
      await app.init({
        antialias: true,
        resizeTo: domElement
      })
      app.stage.hitArea = app.screen
      domElement.appendChild(app.canvas)
      this.initDrawingBoard(app.stage)
      console.log("setup", domElement)
    }
    webLog("PixiManager", "initialize", domElement)
    return app
  }

  getApp(): Application | null {
    return PixiManager._app
  }

  setApp(app?: Application): void {
    PixiManager._app = app ?? new Application()
  }

  /**
   * 画板样式初始化操作
   * @param stage 舞台或者容器
   */
  private initDrawingBoard(stage: Container): void {
    if (!stage) {
      return
    }
    // requestAnimationFrame(() => {
    setupLayer(stage)
    setupStage(stage)
    // })
  }

  static setDrawingBoardScale(scale: number): void {
    const stage = PixiManager._instance.getApp()?.stage
    if (!stage || scale < 0.25 || scale > 3) {
      return
    }
    PixiManager.viewScale = scale
    const karte = getElementByLabel(ELEMENT_FLAG.Karte, stage)
    if (karte) {
      // initSettingsBasiskarte(karte, true)
      // TODO: 更新辅助元素（标尺|网格等）
    }
    const staff = getElementByLabel(ELEMENT_FLAG.Staff, stage)
    if (staff) {
      // initSettingsStaff(staff, true)
    }
    const layer = getElementByLabel(ELEMENT_FLAG.Layer, stage)
    if (layer) {
      initSettingsUiLayer(layer)
    }
  }

  static release(): void {}
}

export default PixiManager
