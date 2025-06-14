import PixiManager from "@/helpers/graphics/gremlin"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"
import { createGraphics } from "@/helpers/graphics/gremlin/generator/graphics"
import { getRandomColor } from "@/utils/functions/color"
import { webLog } from "@/utils/log"
import type { Container } from "pixi.js"

/**
 * @summary rect 点位绘制与 graphics 点位绘制的区别
 * @remarks
 * - rect 设置点位，是相对于 graphics 的坐标系画出一个矩形，但 graphics 位置仍为原值
 * - graphics 设置点位，是相对于父容器的位置，graphics 的定位改变
 */
function debugPixiSetPoint(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const graphic = createGraphics(child, {
    interactive: true,
    eventMode: "static",
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  graphic
    .rect(-25, -25, matrixItem.width, matrixItem.height)
    .fill(getRandomColor())
}

/**
 * @summary 模拟图形的 Cocos 风格锚点行为（警告：旋转有缺陷）
 * @remarks
 * 由于以下原因，当前实现无法正确处理旋转：
 * - 缺少真正的锚点配置
 */
export function debugGraphicAnchor(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const size = {
    width: 50,
    height: 50
  }
  const anchor = {
    x: 0.5,
    y: 0.5
  }
  const graphic = createGraphics(child, {
    position: {
      x: size.width * 2,
      y: size.height * 2
    },
    pivot: {
      x: size.width * anchor.x,
      y: -size.height * anchor.y
    }
    // rotation: Math.PI / 4 // PI/4 弧度
  })
  graphic.rect(0, 0, size.width, size.height).fill(getRandomColor())
  webLog("debugPixiGraphic", "debugGraphicAnchor", container, matrixItem)
}

function debugPixiGraphic(layerContainer: Container): void {
  debugPixiSetPoint(layerContainer)
  debugGraphicAnchor(layerContainer)
}

export default debugPixiGraphic
