import { getRandomColor } from "@/utils/functions/color"
import {
  type Container,
  type FillInput,
  Graphics,
  type GraphicsOptions
} from "pixi.js"

export function createGraphics(
  parent: Container | undefined = undefined,
  options: GraphicsOptions = {},
  config: {
    width?: number
    height?: number
    x?: number
    y?: number
    color?: FillInput
  } = {}
): Graphics {
  const graphic = new Graphics(options)
  graphic
    .rect(
      config.x ?? 0,
      config.y ?? 0,
      config.width ?? 100,
      config.height ?? 100
    )
    .fill(config.color ?? getRandomColor())
  if (parent) {
    parent.addChild(graphic)
  }
  return graphic
}
