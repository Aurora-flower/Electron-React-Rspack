import {
  getMovePoint,
  getPoint,
  getSize
} from "@/common/frequently-used/usually"
import PixiManager, { DEFAULT_GRID_INTERVAL } from "@/helpers/render/gremlin"
import type { ContainerParent } from "@/helpers/render/gremlin/interface"
import { formatNumberPrecision } from "@/utils/modules/math"
import type { Container, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"

type DrawLineHander = (linePoint: LinePointModel) => void

class Grid {
  private _parent: ContainerParent
  private _size: SizeModel = getSize()
  private _girdInterval: PointModel = getPoint(
    DEFAULT_GRID_INTERVAL,
    DEFAULT_GRID_INTERVAL
  )
  private _strokeInput: StrokeInput = {
    width: 1,
    color: 0xcccccc,
    alpha: 0.3
  }
  private _zoom = 1
  private _grid: Graphics = new Graphics({
    label: PixiManager.elementFlag.grid
  })

  constructor(
    parent: Container,
    size?: SizeModel,
    storeStyle?: StrokeInput,
    girdInterval?: PointModel
  ) {
    this._parent = parent
    if (size) {
      this._size = size
    }
    if (girdInterval) {
      this._girdInterval = girdInterval
    }
    if (storeStyle) {
      this._strokeInput = storeStyle
    }
  }

  setGridInterval(zoom: number): void {
    this._zoom = zoom
    const value = formatNumberPrecision(DEFAULT_GRID_INTERVAL * zoom, 0)
    this._girdInterval = {
      x: value,
      y: value
    }
  }

  draw(scale = this._zoom): void {
    this.clear()
    this.setGridInterval(scale)
    this._grid.setStrokeStyle(this._strokeInput)
    this.logic(this._size, this._girdInterval)
    if (this._parent) {
      this._parent.addChild(this._grid)
    }
  }

  private drawGridLine(linePoint: LinePointModel): void {
    this._grid
      .moveTo(linePoint.from.x, linePoint.from.y)
      .lineTo(linePoint.to.x, linePoint.to.y)
      .stroke()
  }

  private logic(
    size: SizeModel,
    gridInterval: PointModel,
    drawLine: DrawLineHander = this.drawGridLine.bind(this)
  ): void {
    for (let x = 0; x <= size.width; x += gridInterval.x) {
      const linePoint = getMovePoint({ x, y: 0 }, { x, y: size.height })
      if (drawLine) {
        drawLine(linePoint)
      }
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const linePoint = getMovePoint({ x: 0, y }, { x: size.width, y })
      if (drawLine) {
        drawLine(linePoint)
      }
    }
  }

  clear(): void {
    this._grid.clear()
  }

  destroy(): void {
    this._grid.destroy()
  }
}

export default Grid
