import { getPoint, getSize } from "@/common/frequently-used/usually"
import { debugPixiRender } from "@/debug"
import Axis from "@/helpers/render/gremlin/controller/assistant/axis"
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
import { Application, type Container } from "pixi.js"

overwritePixi()

const MIN_SCALE = 0.25
const MAX_SCALE = 3

const PIVOT = {
  x: -100,
  y: -100
}

// const layer = new RenderLayer()
// layer.attach(basiskarteContainer, layerContainer, rulerContainer)
// app.stage.addChild(layer)

class PixiManager {
  static elementFlag = {
    karte: "_$basiskarte",
    layer: "_$layer",
    staff: "_$staff",
    grid: "_$grid",
    ruler: "_$ruler",
    selector: "_$selector",
    axis: "_$axis"
  }
  private static _app: Application
  private static _matrix: MatrixModel[]
  /* 暂时不考虑非同比例缩放 */
  private static _scale = 1
  private static _lastZoom = 1

  static async initialize(root: HTMLDivElement | string): Promise<Application> {
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
    PixiManager.initMatrx()
    setupStageHook(app)
    return app
  }

  static initMatrx(app: Application = PixiManager._app): void {
    const interval = {
      x: 200,
      y: 200
    }
    PixiManager._matrix = calculateMatrixCoordinates(
      getSize(app.renderer.width, app.renderer.height),
      interval
    )
  }

  static initCanvas(app: Application = PixiManager._app): void {
    if (!app?.stage) {
      return
    }
    /* 图层与标尺、网格绘制 */
    const canvasStage = app.stage
    const zoom = PixiManager._scale
    const lastZoom = PixiManager._lastZoom
    if (lastZoom === zoom && lastZoom !== 1) {
      return
    }
    if (canvasStage.children.length !== 0) {
      canvasStage.removeChildren()
      PixiManager.resetMatrix()
    }
    const basiskarte = createContainer(canvasStage, {
      label: PixiManager.elementFlag.karte
    }) // 背景板图层
    const layerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.layer
    }) // 绘制图层
    const rulerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.staff
    }) // 刻度尺
    PixiManager.setPivot(layerContainer)
    const width = app.renderer.width
    const height = app.renderer.height
    const viewSize = getSize(width, height)
    requestAnimationFrame(() => {
      const grid = new Grid(basiskarte, viewSize)
      grid.setGridInterval(zoom)
      grid.draw()
      const ruler = new Ruler(rulerContainer, viewSize)
      ruler.setRulerInterval(zoom)
      ruler.draw()
      const axis = new Axis(basiskarte, viewSize)
      axis.draw()
      // const validHeight = viewSize.height ?? 0
      // layerContainer.pivot.set(-50, -validHeight + 50)
      PixiManager._lastZoom = zoom
    })
    debugPixiRender(layerContainer) /* 测试渲染 */
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

  static setPivot(
    layer: Container,
    x: number = PIVOT.x,
    y: number = PIVOT.y
  ): void {
    const zoom = PixiManager.getZoom()
    const pivot = getPoint(x * zoom, y * zoom)
    const root = layer ?? PixiManager._app?.stage
    root.pivot.set(pivot.x, pivot.y)
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

  static resetMatrix(): void {
    PixiManager._matrix.map(item => {
      item.able = true
    })
  }
}

export default PixiManager
