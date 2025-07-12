import type { Container, GraphicsOptions, StrokeInput } from "pixi.js"
import { Graphics } from "pixi.js"
import { DEFAULT_COLOR } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"
import { getRandomColor } from "@/utils/functions/color"

type GraphicsConfig = ConfigModel & {
  isFill?: boolean
  color?: number | string
  stroke?: StrokeInput
}

export function createGraphics(
  parent: Container | undefined = undefined,
  options: GraphicsOptions = {},
  config: ConfigModel = {
    isNormalAppend: true,
    zIndex: 0
  }
): Graphics {
  const graphic = new Graphics({
    // TODO: Graphics 默认值的设置
    interactive: true,
    eventMode: "static",
    ...options
  })
  if (parent) {
    viewAppend(parent, [graphic], config)
  }
  return graphic
}

export function drawRect(
  graphic: Graphics,
  position: PointModel,
  size: SizeModel,
  config: GraphicsConfig = {
    isFill: true,
    color: DEFAULT_COLOR
  }
): void {
  graphic.rect(position.x, position.y, size.width, size.height)
  if (config.isFill) {
    graphic.fill(config.color ?? getRandomColor())
  }
  graphic.stroke(config.stroke)
}

export function drawCircle(
  graphic: Graphics,
  position: PointModel,
  radius: number,
  config: GraphicsConfig = {
    isFill: true,
    color: DEFAULT_COLOR
  }
): void {
  graphic.circle(position.x, position.y, radius)
  if (config.isFill) {
    graphic.fill(config.color ?? getRandomColor())
  }
  graphic.stroke(config.stroke)
}

export function drawEllipse(
  graphic: Graphics,
  position: PointModel,
  radius: PointModel,
  config: GraphicsConfig = {
    isFill: true,
    color: DEFAULT_COLOR
  }
): void {
  graphic.ellipse(position.x, position.y, radius.x, radius.y)
  if (config.isFill) {
    graphic.fill(config.color ?? getRandomColor())
  }
  graphic.stroke(config.stroke)
}
