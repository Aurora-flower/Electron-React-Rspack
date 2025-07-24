import type { Container } from "pixi.js"
import { Graphics } from "pixi.js"
import { DEFAULT_RULER_SIZE } from "@/helpers/graphics/gremlin/constant/defaultValue"
import ELEMENT_FLAG from "@/helpers/graphics/gremlin/constant/elementFlag"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics/drawLine"
import type { ContainerParent } from "@/helpers/graphics/gremlin/interface"
import { roundToDecimal } from "@/utils/functions/math"
import { getPoint, getSize } from "@/utils/functions/usually"

class Axis {
  private _parent: ContainerParent
  private _size: SizeModel = getSize()
  private _axis: Graphics = new Graphics({
    label: ELEMENT_FLAG.Axis
  })
  private _zoom = 1
  private _axisOffset = getPoint(DEFAULT_RULER_SIZE, DEFAULT_RULER_SIZE)

  constructor(parent: Container, size?: SizeModel) {
    this._parent = parent
    if (size) {
      this._size = size
    }
  }

  setAxisOffset(zoom: number): void {
    this._zoom = zoom
    const value = roundToDecimal(DEFAULT_RULER_SIZE * zoom, 0)
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
      [
        [this._axisOffset.x, 0],
        [this._axisOffset.x, this._size.height]
      ],
      this._axis,
      verticalLineStroke
    )
    drawLine(
      [
        [0, this._axisOffset.y],
        [this._size.width, this._axisOffset.y]
      ],
      this._axis,
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
