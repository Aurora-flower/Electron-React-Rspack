import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { webLog } from "@/utils/log"
import { getDomElement } from "@/utils/mod/dom"
import { Application, RenderLayer } from "pixi.js"

class PixiManager {
  private static app: Application

  static async init(root: HTMLDivElement | string): Promise<Application> {
    let domElement = root as HTMLElement
    if (typeof root === "string") {
      const element = getDomElement(root, "id")
      if (element) {
        domElement = element
      }
    }
    const app = new Application()
    PixiManager.app = app
    await app.init({
      antialias: true,
      resizeTo: domElement
    })
    domElement.appendChild(app.canvas)
    webLog("pixi", "init", root)
    return app
  }

  static initCanvas(app: Application): void {
    // 图层
    const basiskarte = new RenderLayer()
    const layer = new RenderLayer()
    app.stage.addChild(basiskarte, layer)
    const basiskarteContainer = createContainer(app.stage)
    const layerContainer = createContainer(app.stage)
    const rect = createGraphics(
      { x: 0, y: 0, color: 0xffffff },
      basiskarteContainer
    )
    createGraphics({ x: 80, y: 80, color: 0xffc0cb }, layerContainer)
    basiskarte.attach(basiskarteContainer)
    layer.attach(layerContainer)

    setTimeout(() => {
      rect.clear()
      rect.position.set(200, 200)
      rect.setSize(50, 50)
      rect.fill(0x004a77)
      basiskarteContainer.position.set(100, 100)
      app.renderer.render(app.stage)
    }, 1000)
  }

  static destroy(): void {
    webLog("pixi", "destroy")
  }

  static getApp(): Application {
    return PixiManager.app
  }
}

export default PixiManager
