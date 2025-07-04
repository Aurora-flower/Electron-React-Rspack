import PixiManager from "@/helpers/graphics/gremlin"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"

function debugPixiStage(): void {
  const app = PixiManager.getApp()
  const label = ELEMENT_FLAG.Layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
  /* 1. 坐标起始点的切换 */
}

export function debugPixiAppRender(): void {
  const app = PixiManager.getApp()
  const label = ELEMENT_FLAG.Layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
}

export function debugPixiAppRenderer(): void {
  const app = PixiManager.getApp()
  const label = ELEMENT_FLAG.Layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
}

export default debugPixiStage
