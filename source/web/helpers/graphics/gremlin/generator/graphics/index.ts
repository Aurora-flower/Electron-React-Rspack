import { DEFAULT_COLOR } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"
import { getRandomColor } from "@/utils/functions/color"
import { Graphics } from "pixi.js"
import type { Container, GraphicsOptions, StrokeInput } from "pixi.js"

export function createGraphics(
  parent: Container,
  options: GraphicsOptions = {},
  config: ConfigModel = {
    isNormalAppend: true,
    zIndex: 0
  }
): Graphics {
  const graphic = new Graphics({
    // TODO: Graphics 默认值的设置
    ...options
  })
  viewAppend(parent, [graphic], config)
  return graphic
}

export function drawRect(
  graphic: Graphics,
  position: PointModel,
  size: SizeModel,
  isFill = true,
  color: number | string = DEFAULT_COLOR,
  stroke?: StrokeInput
): void {
  graphic.rect(position.x, position.y, size.width, size.height)
  if (isFill) {
    graphic.fill(color ?? getRandomColor())
  }
  if (stroke) {
    graphic.stroke(stroke)
  }
}

export function drawCircle(
  graphic: Graphics,
  position: PointModel,
  radius: number,
  isFill = true,
  color: number | string = DEFAULT_COLOR,
  stroke?: StrokeInput
): void {
  graphic.circle(position.x, position.y, radius)
  if (isFill) {
    graphic.fill(color ?? getRandomColor())
  }
  if (stroke) {
    graphic.stroke(stroke)
  }
}

export function drawEllipse(
  graphic: Graphics,
  position: PointModel,
  radius: PointModel,
  isFill = true,
  color: number | string = DEFAULT_COLOR,
  stroke?: StrokeInput
): void {
  graphic.ellipse(position.x, position.y, radius.x, radius.y)
  if (isFill) {
    graphic.fill(color ?? getRandomColor())
  }
  if (stroke) {
    graphic.stroke(stroke)
  }
}
