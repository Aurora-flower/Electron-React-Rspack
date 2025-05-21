import type {
  ContainerParent,
  PointModel,
  SizeModel
} from "@/helpers/render/gremlin/types"
import { webLog } from "@/utils/log"
import { type Container, Graphics, type StrokeInput } from "pixi.js"

interface LinePoint {
  from: PointModel
  to: PointModel
}

type DrawLineHander = (linePoint: LinePoint) => void

class Grid {
  private _parent: ContainerParent = undefined
  private _size: SizeModel = {
    width: 0,
    height: 0
  }

  private _girdInterval: PointModel = {
    x: 10,
    y: 10
  }

  private _defaultStroke: StrokeInput = {
    width: 1,
    color: 0xcccccc,
    alpha: 0.3
  }

  private _grid: Graphics = new Graphics()

  constructor(
    parent: Container,
    size?: SizeModel,
    girdInterval?: PointModel,
    storeStyle?: StrokeInput
  ) {
    this._parent = parent
    if (size) {
      this._size = size
    }
    if (girdInterval) {
      this._girdInterval = girdInterval
    }
    this?._grid.setStrokeStyle(storeStyle ?? this._defaultStroke)
  }

  draw(): void {
    webLog("Grid", "draw", this?._grid)
    this.logic(this._size, this._girdInterval)
    if (this._parent && this?._grid) {
      this._parent.addChild(this?._grid)
    }
  }

  private drawGridLine(linePoint: LinePoint): void {
    if (this?._grid) {
      this?._grid
        .moveTo(linePoint.from.x, linePoint.from.y)
        .lineTo(linePoint.to.x, linePoint.to.y)
      this?._grid.stroke()
    }
  }

  private logic(
    size: SizeModel,
    gridInterval: PointModel,
    drawHorizontalLine: DrawLineHander = this.drawGridLine.bind(this),
    drawVerticalLine: DrawLineHander = this.drawGridLine.bind(this)
  ): void {
    for (let x = 0; x <= size.width; x += gridInterval.x) {
      const linePoint = {
        from: { x, y: 0 },
        to: { x, y: size.height }
      }
      if (drawHorizontalLine) {
        drawHorizontalLine(linePoint)
      }
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const linePoint = {
        from: { x: 0, y },
        to: { x: size.width, y }
      }
      if (drawVerticalLine) {
        drawVerticalLine(linePoint)
      }
    }
  }

  clear(): void {
    this?._grid.clear()
  }

  destory(): void {
    this?._grid.destroy()
  }

  remove(): void {
    if (this._parent) {
      this._parent?.removeChild()
    }
  }
}

export default Grid
