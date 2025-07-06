import { PIVOT_OFFSET_VALUE } from "@/helpers/graphics/gremlin"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics"
import type { ContainerParent } from "@/helpers/graphics/gremlin/interface"
import { formatNumberPrecision } from "@/utils/functions/math"
import { getPoint, getSize } from "@/utils/functions/usually"
import type { Container } from "pixi.js"
import { Graphics } from "pixi.js"

class Axis {
  private _parent: ContainerParent
  private _size: SizeModel = getSize()
  private _axis: Graphics = new Graphics({
    label: ELEMENT_FLAG.axis
  })
  private _zoom = 1
  private _axisOffset = getPoint(PIVOT_OFFSET_VALUE, PIVOT_OFFSET_VALUE)

  constructor(parent: Container, size?: SizeModel) {
    this._parent = parent
    if (size) {
      this._size = size
    }
  }

  setAxisOffset(zoom: number): void {
    this._zoom = zoom
    const value = formatNumberPrecision(PIVOT_OFFSET_VALUE * zoom, 0)
    this._axisOffset = {
      x: value,
      y: value
    }
  }

  draw(scale = this._zoom): void {
    this.clear()
    this.setAxisOffset(scale)
    if (!this._parent) return
    const horizontalLineStroke = {
      width: 3,
      color: 0xffffff,
      alpha: 0.3
    }
    const verticalLineStroke = {
      width: 3,
      color: 0xffffff,
      alpha: 0.3
    }
    drawLine(
      this._axis,
      {
        from: { x: this._axisOffset.x, y: 0 },
        to: { x: this._axisOffset.x, y: this._size.height }
      },
      verticalLineStroke
    )
    drawLine(
      this._axis,
      {
        from: { x: 0, y: this._axisOffset.y },
        to: { x: this._size.width, y: this._axisOffset.y }
      },
      horizontalLineStroke
    )
    this._parent.addChild(this._axis)
  }

  clear(): void {
    this._axis.clear()
  }

  destroy(): void {
    this._axis.destroy()
  }
}

export default Axis
