import { getSize } from "@/common/frequently-used/usually"
import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/render/gremlin/controller/assistant/ruler"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { setupStageHook } from "@/helpers/render/gremlin/hooks/setupStageHook"
import { overwritePixi } from "@/helpers/render/gremlin/overwrite"
import {
  type MatrixModel,
  calculateMatrixCoordinates
} from "@/logic/algorithm/matrix"
import { getDomElement } from "@/utils/dom"
import { formatNumberPrecision } from "@/utils/modules/digits"
import { Application } from "pixi.js"

overwritePixi()

const MIN_SCALE = 0.1
const MAX_SCALE = 3

// const layer = new RenderLayer()
// layer.attach(basiskarteContainer, layerContainer, rulerContainer)
// app.stage.addChild(layer)

class PixiManager {
  static elementFlag = {
    karte: "_$basiskarte",
    layer: "_$layer",
    staff: "_$staff",
    grid: "_$grid",
    ruler: "_$ruler"
  }
  private static _app: Application
  private static _matrix: MatrixModel[]
  /* 暂时不考虑非同比例缩放 */
  private static _scale = 1

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

    /* 图层与标尺、网格绘制 */
    const canvasStage = app.stage
    const zoom = PixiManager._scale
    if (canvasStage.children.length !== 0) {
      canvasStage.removeChildren()
    }
    const basiskarte = createContainer(canvasStage, {
      label: PixiManager.elementFlag.karte
    }) // 背景板图层
    if (basiskarte.children.length !== 0) {
      basiskarte.removeChildren()
    }
    const layerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.layer
    }) // 绘制图层
    if (layerContainer.children.length !== 0) {
      layerContainer.removeChildren()
    }
    const rulerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.staff
    }) // 刻度尺
    if (rulerContainer.children.length !== 0) {
      rulerContainer.removeChildren()
    }
    layerContainer.pivot.set(-50, -50) // 右下
    const width = app.renderer.width
    const height = app.renderer.height
    const viewSize = getSize(width / zoom, height / zoom)
    requestAnimationFrame(() => {
      const grid = new Grid(basiskarte, viewSize)
      grid.setGridInterval(zoom)
      grid.draw()
      const ruler = new Ruler(rulerContainer, viewSize)
      ruler.setRulerInterval(zoom)
      ruler.draw()
      // const validHeight = viewSize.height ?? 0
      // layerContainer.pivot.set(-50, -validHeight + 50)
    })
  }

  static stageClear(): void {
    if (PixiManager._app?.stage) {
      PixiManager._app.stage.removeChildren()
      // PixiManager._app.stage.destroy()
    }
  }

  static getZoom(): number {
    return PixiManager._scale
  }

  static setZoom(scale: number): void {
    const value = formatNumberPrecision(
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
    )
    PixiManager._scale = value
  }

  static getApp(): Application {
    return PixiManager._app
  }

  static getMatrix(): MatrixModel[] {
    return PixiManager._matrix
  }

  static findUsableMatrix(): MatrixModel | undefined {
    const matrixItem = PixiManager._matrix.find(item => item.able)
    if (matrixItem) {
      matrixItem.able = false
    }
    return matrixItem
  }
}

export default PixiManager
