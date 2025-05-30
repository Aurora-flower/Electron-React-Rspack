import PixiManager from "@/helpers/render/gremlin"
// import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { getRandomColor } from "@/utils/functions/color"
import type { Container } from "pixi.js"

export function debugPixiDrag(container: Container): void {
  const matrixItem1 = PixiManager.findUsableMatrix()
  const matrixItem2 = PixiManager.findUsableMatrix()
  if (!matrixItem1 || !matrixItem2) return
  // const box = createContainer(container, {
  //   label: "debug-container",
  //   position: { x: matrixItem1.x, y: matrixItem1.y }
  // })
  const graphic1 = createGraphics(container, {
    position: { x: matrixItem1.x, y: matrixItem1.y }
  })
  const graphic2 = createGraphics(container, {
    position: { x: matrixItem2.x, y: matrixItem2.y }
  })
  graphic1
    .rect(0, 0, matrixItem1.width, matrixItem1.height)
    .fill(getRandomColor())
  graphic2
    .rect(matrixItem1.width, 0, matrixItem2.width, matrixItem2.height)
    .fill(getRandomColor())
}

export function debugPixiContainer(layerContainer: Container): void {
  debugPixiDrag(layerContainer)
}
