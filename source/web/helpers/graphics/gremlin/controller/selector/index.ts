import type { Container, DestroyOptions } from "pixi.js"
import { Graphics } from "pixi.js"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { getCumulativeScale } from "@/helpers/graphics/gremlin/functions/compute"

const BORAD_WIDTH = 3

const BORAD_COLOR = 0x3d80a5

const STORKE_STYLE = {
  width: BORAD_WIDTH,
  color: BORAD_COLOR,
  alpha: 0.5
}

class Selector {
  private static _selector: Graphics // _checkbox
  private static _target: Container | null = null

  static init(parent: Container): void {
    Selector.reCreate()
    requestAnimationFrame(() => {
      if (!parent.children.includes(Selector._selector)) {
        viewAppend(parent, [Selector._selector])
      }
    })
  }

  static select(target: Container): void {
    Selector._target = target
    Selector.draw()
  }

  static move(point: PointModel): void {
    Selector._selector.position.copyFrom(point)
  }

  static draw(): void {
    Selector.release()
    const target = Selector._target
    if (!target) {
      return
    }
    const targetContainer = target.parent
    const ancestorContainer = targetContainer.parent
    const scale = {
      x: getCumulativeScale(ancestorContainer, "x"),
      y: getCumulativeScale(ancestorContainer, "y")
    }
    const size = {
      width: target.width * scale.x * targetContainer.scale.x,
      height: target.height * scale.y * targetContainer.scale.y
    }
    const pos = target.getGlobalPosition().clone()
    Selector.move(pos)
    Selector._selector.pivot.set(
      (size.width * 0.5) / scale.x - BORAD_WIDTH,
      (size.height * 0.5) / scale.y - BORAD_WIDTH
    )
    Selector._selector
      .rect(BORAD_WIDTH, BORAD_WIDTH, size.width, size.height)
      .stroke(STORKE_STYLE)
  }

  static reCreate(): void {
    Selector._selector = new Graphics({
      label: ELEMENT_FLAG.Selector
    })
  }

  static release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      Selector._selector.destroy(configuration)
    } else {
      Selector._selector.clear()
    }
  }

  static destory(): void {
    Selector.release(true)
    Selector.reCreate()
    Selector._target = null
  }
}

export default Selector
