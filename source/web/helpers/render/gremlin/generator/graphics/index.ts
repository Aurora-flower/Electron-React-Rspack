import { Graphics } from "pixi.js"
import type { Container, GraphicsOptions } from "pixi.js"

export function createGraphics(
  parent: Container | undefined = undefined,
  options: GraphicsOptions = {},
  _config = {}
): Graphics {
  const graphic = new Graphics(options)
  if (parent) {
    parent.addChild(graphic)
  }
  return graphic
}
