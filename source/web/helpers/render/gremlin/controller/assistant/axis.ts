import { getSize } from "@/common/frequently-used/usually"
import PixiManager from "@/helpers/render/gremlin"
import { drawLine } from "@/helpers/render/gremlin/generator/graphics"
import type { ContainerParent } from "@/helpers/render/gremlin/interface"
import { type Container, Graphics } from "pixi.js"

class Axis {
  private _parent: ContainerParent
  private _size: SizeModel = getSize()
  private _axis: Graphics = new Graphics({
    label: PixiManager.elementFlag.axis
  })

  constructor(parent: Container, size?: SizeModel) {
    this._parent = parent
    if (size) {
      this._size = size
    }
  }

  draw(): void {
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
        from: { x: 0, y: -100 },
        to: { x: 0, y: this._size.height }
      },
      verticalLineStroke
    )
    drawLine(
      this._axis,
      {
        from: { x: -100, y: 0 },
        to: { x: this._size.width, y: 0 }
      },
      horizontalLineStroke
    )
    this._parent.addChild(this._axis)
  }
}

export default Axis
