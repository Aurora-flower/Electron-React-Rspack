import {
  getMovePoint,
  getPoint,
  getSize
} from "@/common/frequently-used/usually"
import type { ContainerParent } from "@/helpers/render/gremlin/interface"
import type { Container, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"

type DrawLineHander = (linePoint: LinePointModel) => void

class Grid {
  private _parent: ContainerParent = undefined
  private _size: SizeModel = getSize()
  private _girdInterval: PointModel = getPoint(50, 50)
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
