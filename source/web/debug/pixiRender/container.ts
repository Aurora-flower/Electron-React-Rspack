import PixiManager from "@/helpers/render/gremlin"
import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { getRandomColor } from "@/utils/functions/color"
import type { Container } from "pixi.js"

export function debugPixiDrag(container: Container): void {
  const matrixItem1 = PixiManager.findUsableMatrix()
  const matrixItem2 = PixiManager.findUsableMatrix()
  if (!matrixItem1 || !matrixItem2) return
  const box = createContainer(container, {
    label: "debug-container",
    position: { x: matrixItem1.x, y: matrixItem1.y }
  })
  const graphic1 = createGraphics(box, {})
  const graphic2 = createGraphics(box, {})
  graphic1
    .rect(0, 0, matrixItem1.width, matrixItem1.height)
    .fill(getRandomColor())
  TargetDrag.markTarget(graphic1)
  graphic2
    .rect(matrixItem1.width, 0, matrixItem2.width, matrixItem2.height)
    .fill(getRandomColor())
  TargetDrag.markTarget(graphic2)
  // TargetDrag.markTarget(box)
}

export function debugPixiContainer(): void {
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
  debugPixiDrag(layerContainer)
}
