import PixiManager from "@/helpers/graphics/gremlin"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { isContainer } from "@/helpers/graphics/gremlin/functions/is"
import { createGraphics } from "@/helpers/graphics/gremlin/generator/graphics"
import type { Container } from "pixi.js"

class RenderSelector {
  static selector: string

  static select(gremlin: Container): void {
    const parent = gremlin.parent
    if (isContainer(parent)) {
      const label = PixiManager.elementFlag.selector
      const lastSelector = getElementByLabel(label, parent)
      if (lastSelector) {
        lastSelector.destroy()
      }
      const graphic = createGraphics(parent, {
        label,
        position: {
          x: gremlin.x,
          y: gremlin.y
        }
      })
      graphic.rect(0, 0, gremlin.width, gremlin.height).stroke({
        width: 3,
        color: 0xffffff,
        alpha: 0.5
      })
    }
  }
}

export default RenderSelector
