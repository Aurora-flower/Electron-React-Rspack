import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import { getDomElement } from "@/utils/dom"
import { webLog } from "@/utils/log"
import {
  Application,
  Assets,
  type FederatedPointerEvent,
  HTMLText,
  RenderLayer,
  type Texture
} from "pixi.js"

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

    // TEST
    loadTexture(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`).then(
      (texture: Texture) => {
        const react1 = createGraphics(
          basiskarteContainer,
          {
            interactive: true,
            eventMode: "static"
          },
          {
            x: 0,
            y: 0,
            color: 0xffffff
          }
        )
        // const react2 =
        createGraphics(layerContainer, undefined, {
          x: 80,
          y: 80,
          color: 0xffc0cb
        })
        const container = createContainer(layerContainer, {
          width: 300,
          height: 300
          // scale: {
          //   x: 0.7,
          //   y: 0.7
          // }
        })
        container.tint = 0x036fc2
        // const mask = new Graphics()
        // mask.rect(40, 40, 60, 60).fill(0xffffff)
        const sprite = createSprite(container, {
          texture,
          width: 300,
          height: 300
        })
        sprite.position.set(300, 300)
        // sprite.mask = mask
        // container.addChild(mask)

        createNineSliceSprite(container, {
          texture,
          width: 300,
          height: 300,
          leftWidth: 80,
          rightWidth: 80,
          topHeight: 80,
          bottomHeight: 80
        })

        Assets.addBundle("fonts", [
          {
            alias: "Lineal",
            src: "https://pixijs.com/assets/webfont-loader/Lineal.otf"
          },
          {
            alias: "Dotrice Regular",
            src: "https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff"
          }
        ])

        Assets.loadBundle("fonts").then(() => {
          const text2 = new HTMLText({
            text: "Lineal.otf",
            style: { fontFamily: "Lineal", fontSize: 50, fill: 0xffffff }
          })
          const text3 = new HTMLText({
            text: "Dotrice Regular.woff",
            style: {
              fontFamily: "Dotrice Regular",
              fontSize: 50,
              fill: 0xffffff
            }
          })
          text2.y = 150
          text3.y = 300
          container.addChild(text2, text3)
        })
        // const dragData = {
        //   offset: {
        //     x: 0,
        //     y: 0
        //   }
        // }

        // TEST
        react1.on("pointerdown", (e: FederatedPointerEvent): void => {
          if (e.button !== 0) return
          const target = e.target
          webLog("PixiManager", "pointerdown", target, target.constructor.name)
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
          webLog(
            "PixiManager",
            "update",
            container.position,
            container.getSize()
          )
        }, 3 * 1000)
      }
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
