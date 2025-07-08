import type { Container, DestroyOptions, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"
import { DEFAULT_GRID_INTERVAL } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics/drawLine"
import { getPoint, getSize } from "@/utils/functions/usually"

const DEFAULT_STROKE_INPUT: StrokeInput = {
  width: 1,
  color: 0xcccccc,
  alpha: 0.3
}

class Grid {
  // private static _instance: Grid
  private static _grid: Graphics

  // public static getInstance(): Grid {
  //   if (!Grid._instance) {
  //     Grid._instance = new Grid()
  //   }
  //   return Grid._instance
  // }

  static draw(
    parent: Container,
    size: SizeModel,
    scale = 1,
    strokeInput?: StrokeInput,
    girdInterval?: PointModel
  ): void {
    Grid._grid = new Graphics()
    const renderSize = size ?? getSize()
    const renderInterval = girdInterval ?? {
      x: DEFAULT_GRID_INTERVAL,
      y: DEFAULT_GRID_INTERVAL
    }
    const style = strokeInput ?? DEFAULT_STROKE_INPUT
    Grid.gridLogic(
      renderSize,
      getPoint(renderInterval.x * scale, renderInterval.y * scale),
      style
    )
    requestAnimationFrame(() => {
      if (!parent.children.includes(Grid._grid)) {
        viewAppend(parent, [Grid._grid])
      }
    })
  }

  static release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      Grid._grid.destroy(configuration)
    } else {
      Grid._grid.clear()
    }
  }

  private static gridLogic(
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
      drawLine([startPoint, endPoint], Grid._grid, style)
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const startPoint: PointArray = [0, y]
      const endPoint: PointArray = [size.width, y]
      drawLine([startPoint, endPoint], Grid._grid, style)
    }
  }
}

export default Grid
