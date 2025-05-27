import { getSize } from "@/common/frequently-used/usually"
import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { setupStageHook } from "@/helpers/render/gremlin/event/wheel"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { overwritePixi } from "@/helpers/render/gremlin/overwrite"
import {
  type MatrixModel,
  calculateMatrixCoordinates
} from "@/logic/algorithm/matrix"
import { getDomElement } from "@/utils/dom"
import { Application, RenderLayer } from "pixi.js"

overwritePixi()

class PixiManager {
  static elementFlag = {
    karte: "basiskarte",
    layer: "layer"
  }
  private static _app: Application
  private static _matrix: MatrixModel[]

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
    const interval = {
      x: 200,
      y: 200
    }
    PixiManager._matrix = calculateMatrixCoordinates(
      getSize(app.renderer.width, app.renderer.height),
      interval
    )
    setupStageHook(app)
    return app
  }

  static initCanvas(app: Application = PixiManager._app): void {
    if (!app?.stage) {
      return
    }
    // 图层
    const basiskarte = new RenderLayer()
    const layer = new RenderLayer()
    const rulerView = new RenderLayer()
    app.stage.addChild(basiskarte, layer, rulerView)
    const basiskarteContainer = createContainer(app.stage, {
      label: PixiManager.elementFlag.karte
    })
    const layerContainer = createContainer(app.stage, {
      label: PixiManager.elementFlag.layer
    })
    const rulerContainer = createContainer(app.stage)
    const viewSize = getSize(app.renderer.width, app.renderer.height)
    requestAnimationFrame(() => {
      const grid = new Grid(basiskarteContainer, viewSize)
      grid.draw()
      const ruler = new Ruler(rulerContainer, viewSize)
      ruler.draw()
      basiskarte.attach(basiskarteContainer, layerContainer, rulerContainer)
      // const validHeight = viewSize.height ?? 0
      // layerContainer.pivot.set(-50, -validHeight + 50)
      layerContainer.pivot.set(-50, -50) // 右下
    })
  }

  static stageClear(): void {
    if (PixiManager._app?.stage) {
      PixiManager._app.stage.removeChildren()
      // PixiManager._app.stage.destroy()
    }
  }

  static getApp(): Application {
    return PixiManager._app
  }

  static getMatrix(): MatrixModel[] {
    return PixiManager._matrix
  }

  static findUsableMatrix(): MatrixModel | undefined {
    return PixiManager._matrix.find(item => item.able)
  }
}

export default PixiManager
