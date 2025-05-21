import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { getDomElement } from "@/utils/dom"
import { webLog } from "@/utils/log"
import Graphics from "@/views/pages/Graphics"
import { Application, Container, RenderLayer, type Texture } from "pixi.js"

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
    const rect = createGraphics(basiskarteContainer, undefined, {
      x: 0,
      y: 0,
      color: 0xffffff
    })
    const viewSize = {
      width: app.renderer.width,
      height: app.renderer.height
    }
    const grid = new Grid(basiskarteContainer, viewSize)
    grid.draw()
    const ruler = new Ruler(rulerContainer, viewSize)
    ruler.draw()
    createGraphics(layerContainer, undefined, { x: 80, y: 80, color: 0xffc0cb })
    basiskarte.attach(basiskarteContainer, layerContainer, rulerContainer)

    loadTexture(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`).then(
      (texture: Texture) => {
        const container = createContainer(layerContainer)
        createSprite(container, {
          texture,
          width: 100,
          height: 100
        })

        // setInterval | setTimeout
        setTimeout(() => {
          // rect.clear()
          // app.renderer.render(app.stage)
          // app.renderer.clear()
          container.position.set(
            container.position.x + 100,
            container.position.y + 100
          )
          webLog("PixiManager", "update", container.position)
        }, 1000)
      }
    )

    webLog(
      "PixiManager",
      "initCanvas",
      rect instanceof Graphics,
      rect instanceof Container,
      basiskarte instanceof Container
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
