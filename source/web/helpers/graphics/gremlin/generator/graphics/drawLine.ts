import { Graphics } from "pixi.js"
import type { StrokeInput } from "pixi.js"

export function drawLine(
  paths: Array<[number, number]>, // 或者使用 Array<[number, number]> 数据类型
  graphics?: Graphics,
  strokeStyle?: StrokeInput,
  isClose?: boolean
): Graphics {
  const target = graphics ?? new Graphics()
  for (let index = 0; index < paths.length; index++) {
    const [x, y] = paths[index]
    if (index === 0) {
      target.moveTo(x, y)
    } else {
      target.lineTo(x, y)
    }
  }
  if (isClose) {
    // 用于绘制封闭的形状（如三角形、矩形等）
    target.closePath()
  }
  target.stroke(strokeStyle)
  // webLog("drawLine", "params", paths, target)
  return target
}

// type DrawLineHander = (linePoint: LinePointModel) => void

// export function drawLine(
//   graphic: Graphics,
//   points: {
//     from: PointModel
//     to: PointModel
//   },
//   stroke?: StrokeInput
// ): void {
//   graphic
//     .moveTo(points.from.x, points.from.y)
//     .lineTo(points.to.x, points.to.y)
//     .stroke(stroke ?? 0xffffff)
// }
