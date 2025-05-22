import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { getDomElement } from "@/utils/dom"
import { webLog } from "@/utils/log"
import { Application, RenderLayer } from "pixi.js"

class PixiManager {
  private static _app: Application

  static async init(root: HTMLDivElement | string): Promise<Application> {
    let domElement = root as HTMLDivElement
    if (typeof root === "string") {
      const element = getDomElement(root, "id") as HTMLDivElement
      if (element) {
        domElement = element
      }
    }
    const app = new Application()
    PixiManager._app = app
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
    const basiskarteContainer = createContainer(app.stage, {
      label: "basiskarte"
    })
    const layerContainer = createContainer(app.stage, {
      label: "layer"
    })
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

  static stageClear(): void {
    if (PixiManager._app?.stage) {
      // PixiManager._app.stage.destroy()
      webLog("PixiManager", "destroy")
    }
  }

  static getApp(): Application {
    return PixiManager._app
  }
}

export default PixiManager
