import { DEFAULT_GRID_INTERVAL } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics/drawLine"
import { getPoint } from "@/utils/functions/usually"
import type { Container, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"

class Grid {
  private static _instance: Grid
  private _grid: Graphics = new Graphics()
  // constructor(root: Container) {
  // }

  public static getInstance(): Grid {
    if (Grid._instance) {
      return Grid._instance
    }
    return new Grid()
  }

  draw(
    parent: Container,
    size?: SizeModel,
    strokeInput?: StrokeInput,
    girdInterval?: PointModel
  ): void {
    const renderSize = size ?? {
      width: 0,
      height: 0
    }
    const renderInterval =
      girdInterval ?? getPoint(DEFAULT_GRID_INTERVAL, DEFAULT_GRID_INTERVAL)
    const style = strokeInput ?? {
      width: 1,
      color: 0xcccccc,
      alpha: 0.3
    }
    this.gridLogic(renderSize, renderInterval, style)
    viewAppend(parent, [this._grid])
  }

  clear(): void {}

  destory(): void {}

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
      const startPoint: [number, number] = [x, 0]
      const endPoint: [number, number] = [x, size.height]
      drawLine([startPoint, endPoint], this._grid, style)
      console.log([[startPoint, endPoint]])
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const startPoint: [number, number] = [0, y]
      const endPoint: [number, number] = [size.width, y]
      drawLine([startPoint, endPoint], this._grid, style)
      console.log([[startPoint, endPoint]])
    }
  }
}

export default Grid
