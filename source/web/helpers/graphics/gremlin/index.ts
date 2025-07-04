/**
 * @file 基于 pixi.js 的渲染
 */
import { debugPixiRender } from "@/debug"
import { getDomElement } from "@/features/document"
import type Axis from "@/helpers/graphics/gremlin/controller/assistant/axis"
import type Grid from "@/helpers/graphics/gremlin/controller/assistant/grid"
import type Ruler from "@/helpers/graphics/gremlin/controller/assistant/ruler"
import { DEFAULT_RULER_SIZE } from "@/helpers/graphics/gremlin/controller/assistant/ruler"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"
import { overwritePixi } from "@/helpers/graphics/gremlin/overwrite"
import {
  type MatrixModel,
  calculateMatrixCoordinates
} from "@/logic/algorithm/matrix"
import { formatNumberPrecision } from "@/utils/functions/math"
import { getPoint, getSize } from "@/utils/functions/usually"
import type { Container, Point } from "pixi.js"
import { Application } from "pixi.js"

overwritePixi()

const MIN_SCALE = 0.25
const MAX_SCALE = 3
// const SCALE_RATIO = 0.1

export const PIVOT_OFFSET_VALUE = 200

export const DEFAULT_GRID_INTERVAL = 50

const PIVOT = -(PIVOT_OFFSET_VALUE + DEFAULT_RULER_SIZE)

// const layer = new RenderLayer()
// layer.attach(basiskarteContainer, layerContainer, rulerContainer)
// app.stage.addChild(layer)

function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string"
    ? (getDomElement(root, "selector") as HTMLElement)
    : root
}

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

  /**
   * 初始化 pixi 应用程序
   * @param {HTMLElement} root 挂载元素
   * @returns {Promise<Application>} 应用实例
   */
  static async initialize(root: HTMLDivElement | string): Promise<Application> {
    const domElement = getRootElement(root)
    const app = new Application()
    await app.init({
      antialias: true,
      resizeTo: domElement
    })
    PixiManager._app = app
    domElement.appendChild(app.canvas)
    // PixiManager.initCanvas()
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
    // PixiManager.setPivot(PixiManager.layerContainer)
    // const width = app.renderer.width
    // const height = app.renderer.height
    // const viewSize = getSize(width, height)
    // PixiManager._grid = new Grid(PixiManager.basiskarte, viewSize)
    // PixiManager._ruler = new Ruler(PixiManager.rulerContainer, viewSize)
    // PixiManager._axis = new Axis(PixiManager.basiskarte, viewSize)
    // PixiManager.basiskarte.pivot.set(-DEFAULT_RULER_SIZE)
    PixiManager.draw()
  }

  static draw(): void {
    if (PixiManager._app?.stage) {
      if (PixiManager.layerContainer?.children.length > 0) {
        PixiManager.layerContainer.removeChildren()
      }
      PixiManager.initMatrx()
    }
    const zoom = PixiManager._scale
    const lastZoom = PixiManager._lastZoom
    if (lastZoom === zoom) {
      return
    }
    // requestAnimationFrame(() => {
    //   PixiManager._grid.draw(zoom)
    //   PixiManager._ruler.draw(zoom)
    //   PixiManager._axis.draw(zoom)
    //   PixiManager._lastZoom = zoom
    // })
    debugPixiRender(PixiManager.layerContainer)
  }

  static getZoom(): number {
    return PixiManager._scale
  }

  static setZoom(scale: number, _centerPoint?: Point): void {
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
    }
  }

  static setPivot(root: Container, x: number = PIVOT, y: number = PIVOT): void {
    const pivot = getPoint(x, y)
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
