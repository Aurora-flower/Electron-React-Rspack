import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { getDomElement } from "@/utils/dom"
import { webLog } from "@/utils/log"
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
    webLog("PixiManager", "init", root)
    return app
  }

  static initCanvas(app: Application): void {
    // 图层
    const basiskarte = new RenderLayer()
    const layer = new RenderLayer()
    const rulerView = new RenderLayer()
    app.stage.addChild(basiskarte, layer, rulerView)
    const basiskarteContainer = createContainer(app.stage)
    const layerContainer = createContainer(app.stage)
    const rulerContainer = createContainer(app.stage)
    const viewSize = {
      width: app.renderer.width,
      height: app.renderer.height
    }
    const grid = new Grid(basiskarteContainer, viewSize)
    grid.draw()
    const ruler = new Ruler(rulerContainer, viewSize)
    ruler.draw()
    basiskarte.attach(basiskarteContainer, layerContainer, rulerContainer)
    webLog(
      "PixiManager",
      "initCanvas",
      app.stage.constructor.name,
      app.stage.isInteractive()
    )
  }

  static destroy(): void {
    webLog("PixiManager", "destroy")
  }

  static getApp(): Application {
    return PixiManager.app
  }
}

export default PixiManager
