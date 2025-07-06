import { DEFAULT_GRID_INTERVAL } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics/drawLine"
import { getPoint, getSize } from "@/utils/functions/usually"
import type { Container, DestroyOptions, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"

const DEFAULT_STROKE_INPUT: StrokeInput = {
  width: 1,
  color: 0xcccccc,
  alpha: 0.3
}

class Grid {
  private static _instance: Grid
  private _grid: Graphics = new Graphics({
    // label: Date.now().toString()
  })

  // constructor(root: Container) {
  // }

  public static getInstance(): Grid {
    if (!Grid._instance) {
      Grid._instance = new Grid()
    }
    return Grid._instance
  }

  draw(
    parent: Container,
    size: SizeModel,
    scale = 1,
    strokeInput?: StrokeInput,
    girdInterval?: PointModel
  ): void {
    const renderSize = size ?? getSize()
    const renderInterval = girdInterval ?? {
      x: DEFAULT_GRID_INTERVAL,
      y: DEFAULT_GRID_INTERVAL
    }
    const style = strokeInput ?? DEFAULT_STROKE_INPUT
    this.gridLogic(
      renderSize,
      getPoint(renderInterval.x * scale, renderInterval.y * scale),
      style
    )
    requestAnimationFrame(() => {
      if (!parent.children.includes(this._grid)) {
        viewAppend(parent, [this._grid])
      }
    })
  }

  release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      this._grid.destroy(configuration)
      this._grid = new Graphics()
    } else {
      this._grid.clear()
    }
  }

  private gridLogic(
    size: SizeModel,
    gridInterval: PointModel,
    style: StrokeInput
    // drawLine: DrawLineHander = this.drawGridLine.bind(this)
  ): void {
    // 避免错误传入 0 值时陷入无限循环
    if (size.width <= gridInterval.x || size.height <= gridInterval.y) {
      return
    }
    for (let x = 0; x <= size.width; x += gridInterval.x) {
      const startPoint: PointArray = [x, 0]
      const endPoint: PointArray = [x, size.height]
      drawLine([startPoint, endPoint], this._grid, style)
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const startPoint: PointArray = [0, y]
      const endPoint: PointArray = [size.width, y]
      drawLine([startPoint, endPoint], this._grid, style)
    }
  }
}

export default Grid
