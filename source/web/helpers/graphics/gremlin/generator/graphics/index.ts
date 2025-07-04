import { TargetDrag } from "@/helpers/graphics/gremlin/event/drag"
import { appendChild } from "@/helpers/graphics/gremlin/functions/append"
import { getRandomColor } from "@/utils/functions/color"
import { Graphics } from "pixi.js"
import type { Container, GraphicsOptions, StrokeInput } from "pixi.js"

export function createGraphics(
  parent: Container | undefined = undefined,
  options: GraphicsOptions = {},
  _config = {},
  isTopIndex = false
  // type: "None" | "Line" | "RectStroke" | "RectFill" | "CircleStroke" | "CircleFill"
): Graphics {
  // TODO: 一般情况下，都是可交互的，只是通过某些标记 - lock 作为不可交互的判断条件
  const graphic = new Graphics({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(graphic)
  parent && appendChild(parent, graphic, isTopIndex)
  return graphic
}

export function drawRect(
  graphic: Graphics,
  position: PointModel,
  size: SizeModel,
  isFill = true,
  stroke?: StrokeInput,
  color?: number | string
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
  stroke?: StrokeInput,
  color?: number | string
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
  stroke?: StrokeInput,
  color?: number | string
): void {
  graphic.ellipse(position.x, position.y, radius.x, radius.y)
  if (isFill) {
    graphic.fill(color ?? getRandomColor())
  }
  if (stroke) {
    graphic.stroke(stroke)
  }
}
