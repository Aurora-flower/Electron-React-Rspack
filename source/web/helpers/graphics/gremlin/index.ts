import { getDomElement } from "@/features/document"
import { overwritePixi } from "@/helpers/graphics/gremlin/overwrite"
import { setupLayer } from "@/helpers/graphics/gremlin/setup/setupLayer"
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
  static viewSize: SizeModel = new Proxy(getSize(), {
    get(target: SizeModel, p: keyof SizeModel, receiver): number {
      const app = PixiManager._app
      if (p === "width" || p === "height") {
        return app.renderer?.[p]
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
    PixiManager._app = app
    domElement.appendChild(app.canvas)
    PixiManager.initDrawingBoard(app.stage)
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
    // setupStage(stage)
  }
}

export default PixiManager
