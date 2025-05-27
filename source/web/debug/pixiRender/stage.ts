import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"

function debugPixiStage(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
  /* 1. 坐标起始点的切换 */
}

export function debugPixiRender(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}

export function debugPixiRenderer(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}

export default debugPixiStage
