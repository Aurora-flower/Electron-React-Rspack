import { getRandomColor } from "@/utils/mod/color"
import { type Container, type FillInput, Graphics } from "pixi.js"

export function createGraphics(
  options: {
    width?: number
    height?: number
    x?: number
    y?: number
    color?: FillInput
  },
  parent?: Container
): Graphics {
  const graphic = new Graphics({
    eventMode: "static",
    interactive: true
  })
  graphic
    .rect(
      options.x ?? 0,
      options.y ?? 0,
      options.width ?? 100,
      options.height ?? 100
    )
    .fill(options.color ?? getRandomColor())
  if (parent) {
    parent.addChild(graphic)
  }
  return graphic
}
