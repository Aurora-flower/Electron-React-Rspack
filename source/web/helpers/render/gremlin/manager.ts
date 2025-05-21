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
    app.stage.addChild(basiskarte, layer)
    const basiskarteContainer = createContainer(app.stage)
    const layerContainer = createContainer(app.stage)
    const rect = createGraphics(basiskarteContainer, undefined, {
      x: 0,
      y: 0,
      color: 0xffffff
    })
    const container = createContainer(layerContainer)
    createGraphics(container, undefined, { x: 80, y: 80, color: 0xffc0cb })

    loadTexture(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`).then(
      (texture: Texture) => {
        createSprite(
          {
            texture
          },
          layerContainer
        )
        basiskarte.attach(basiskarteContainer)
        layer.attach(layerContainer)
      }
    )

    webLog(
      "PixiManager",
      "initCanvas",
      rect instanceof Graphics,
      rect.constructor.name,
      rect instanceof Container,
      basiskarte instanceof Container
    )

    setTimeout(() => {
      rect.clear()
      // rect.position.set(200, 200)
      // rect.setSize(50, 50)
      // rect.fill(0x004a77)
      // basiskarteContainer.position.set(100, 100)
      // app.renderer.render(app.stage)
    }, 1000)
  }

  static destroy(): void {
    webLog("PixiManager", "destroy")
  }

  static getApp(): Application {
    return PixiManager.app
  }
}

export default PixiManager
