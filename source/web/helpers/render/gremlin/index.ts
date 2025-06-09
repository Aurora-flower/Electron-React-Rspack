import { getPoint, getSize } from "@/common/frequently-used/usually"
import Axis from "@/helpers/render/gremlin/controller/assistant/axis"
import Grid from "@/helpers/render/gremlin/controller/assistant/grid"
import Ruler, {
  DEFAULT_RULER_SIZE
} from "@/helpers/render/gremlin/controller/assistant/ruler"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { setupStageHook } from "@/helpers/render/gremlin/hooks/setupStageHook"
import { overwritePixi } from "@/helpers/render/gremlin/overwrite"
import {
  type MatrixModel,
  calculateMatrixCoordinates
} from "@/logic/algorithm/matrix"
import { getDomElement } from "@/utils/features/document"
import { formatNumberPrecision } from "@/utils/modules/math"
import { Application, type Container, type Point } from "pixi.js"

overwritePixi()

const MIN_SCALE = 0.25
const MAX_SCALE = 3
// const SCALE_RATIO = 0.1

export const PIVOT_OFFSET_VALUE = 150

export const DEFAULT_GRID_INTERVAL = 50

const PIVOT = {
  x: -PIVOT_OFFSET_VALUE,
  y: -PIVOT_OFFSET_VALUE
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
  private static _lastZoom = -1
  static basiskarte: Container // 背景板图层
  static layerContainer: Container // 绘制图层
  static rulerContainer: Container // 刻度尺
  /* 辅助元素 */
  private static _grid: Grid
  private static _ruler: Ruler
  private static _axis: Axis

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
    PixiManager.initCanvas()
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
    if (canvasStage.children.length !== 0) {
      canvasStage.removeChildren()
      PixiManager.resetMatrix()
    }
    PixiManager.basiskarte = createContainer(canvasStage, {
      label: PixiManager.elementFlag.karte
    })
    PixiManager.layerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.layer
    })
    PixiManager.rulerContainer = createContainer(canvasStage, {
      label: PixiManager.elementFlag.staff
    })
    PixiManager.setPivot(PixiManager.layerContainer)
    const width = app.renderer.width
    const height = app.renderer.height
    const viewSize = getSize(width, height)
    PixiManager._grid = new Grid(PixiManager.basiskarte, viewSize)
    PixiManager._ruler = new Ruler(PixiManager.rulerContainer, viewSize)
    PixiManager._axis = new Axis(PixiManager.basiskarte, viewSize)
    PixiManager.basiskarte.pivot.set(-DEFAULT_RULER_SIZE)
    PixiManager.draw()
  }

  static draw(): void {
    if (PixiManager._app?.stage) {
      if (PixiManager.layerContainer?.children.length > 0) {
        PixiManager.layerContainer.removeChildren()
      }
      PixiManager._grid.clear()
      PixiManager._axis.clear()
      PixiManager._ruler.clear()
      PixiManager.initMatrx()
    }
    const zoom = PixiManager._scale
    const lastZoom = PixiManager._lastZoom
    if (lastZoom === zoom) {
      return
    }
    requestAnimationFrame(() => {
      PixiManager._grid.draw(zoom)
      PixiManager._ruler.draw(zoom)
      PixiManager._axis.draw(zoom)
      PixiManager._lastZoom = zoom
    })
  }

  static getZoom(): number {
    return PixiManager._scale
  }

  static setZoom(scale: number, centerPoint?: Point): void {
    const oldZoom = PixiManager._scale
    const newZoom = formatNumberPrecision(
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
    )
    if (oldZoom === newZoom) return
    PixiManager._scale = newZoom
    const layer = PixiManager.layerContainer
    if (layer) {
      layer.scale.set(newZoom)
      PixiManager.draw()
      // TODO: 计算缩放中心偏移、位置偏移、应用缩放、更新辅助元素
      console.log("缩放中心点", PixiManager._scale, centerPoint)
    }
  }

  static setPivot(
    layer: Container,
    x: number = PIVOT.x,
    y: number = PIVOT.y
  ): void {
    const zoom = PixiManager.getZoom()
    const pivot = getPoint(x * zoom, y * zoom) // valid
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
