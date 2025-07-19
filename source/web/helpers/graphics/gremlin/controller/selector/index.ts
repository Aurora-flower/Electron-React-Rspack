import type { Container, DestroyOptions } from "pixi.js"
import { Graphics } from "pixi.js"
import { DEFAULT_RULER_SIZE } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { getCumulativeScale } from "@/helpers/graphics/gremlin/functions/compute"
import { getSize } from "@/utils/functions/usually"

const BORAD_WIDTH = 3

const BORAD_COLOR = 0x3d80a5

const STORKE_STYLE = {
  width: BORAD_WIDTH,
  color: BORAD_COLOR
  // alpha: 0.5
}

class Selector {
  private static _selector: Graphics // _checkbox
  private static _target: Container | null = null

  static init(parent: Container): void {
    Selector.reCreate()
    requestAnimationFrame(() => {
      if (!parent.children.includes(Selector._selector)) {
        viewAppend(parent, Selector._selector)
      }
    })
  }

  static select(target: Container): void {
    Selector._target = target
    Selector.draw()
  }

  static refresh(): void {
    const target = Selector._target
    if (target) {
      const pos = target.getGlobalPosition().clone()
      Selector.move(pos)
    }
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
    // TODO: 当缩放为 0.25 时，选中框发生偏移的问题
    const targetContainer = target.parent
    const ancestorContainer = targetContainer.parent
    const scale = {
      x: getCumulativeScale(ancestorContainer, "x"),
      y: getCumulativeScale(ancestorContainer, "y")
    }
    const borderOffset = BORAD_WIDTH / 2
    const size = getSize(
      target.width * scale.x * targetContainer.scale.x - borderOffset,
      target.height * scale.y * targetContainer.scale.y - borderOffset
    )
    const pos = target.getGlobalPosition().clone()
    Selector.move(pos)
    Selector._selector
      .rect(borderOffset, borderOffset, size.width, size.height)
      .stroke(STORKE_STYLE)
  }

  static reCreate(): void {
    Selector._selector = new Graphics({
      label: ELEMENT_FLAG.Selector
    })
    Selector._selector.pivot.set(DEFAULT_RULER_SIZE)
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
