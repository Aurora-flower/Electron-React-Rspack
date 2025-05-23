import type {
  ContainerParent,
  LinePoint,
  PointModel,
  SizeModel
} from "@/helpers/render/gremlin/types"
import type { Container, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"

type DrawLineHander = (linePoint: LinePoint) => void

class Grid {
  private _parent: ContainerParent = undefined
  private _size: SizeModel = {
    width: 0,
    height: 0
  }
  private _girdInterval: PointModel = {
    x: 50,
    y: 50
  }
  private _strokeInput: StrokeInput = {
    width: 1,
    color: 0xcccccc,
    alpha: 0.3
  }
  private _grid: Graphics = new Graphics()

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

  draw(): void {
    this._grid.setStrokeStyle(this._strokeInput)
    this.logic(this._size, this._girdInterval)
    if (this._parent) {
      this._parent.addChild(this._grid)
    }
  }

  private drawGridLine(linePoint: LinePoint): void {
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
      const linePoint = {
        from: { x, y: 0 },
        to: { x, y: size.height }
      }
      if (drawLine) {
        drawLine(linePoint)
      }
    }
    for (let y = 0; y <= size.height; y += gridInterval.y) {
      const linePoint = {
        from: { x: 0, y },
        to: { x: size.width, y }
      }
      if (drawLine) {
        drawLine(linePoint)
      }
    }
  }

  clear(): void {
    this._grid.clear()
  }

  destory(): void {
    this._grid.destroy()
  }

  remove(): void {
    if (this._parent) {
      this._parent?.removeChild()
    }
  }
}

export default Grid
