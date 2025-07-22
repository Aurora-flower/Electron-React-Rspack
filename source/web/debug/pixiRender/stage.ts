import PixiManager from "@/helpers/graphics/gremlin"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { byLabelFindChild } from "@/helpers/graphics/gremlin/functions/query/find"

function debugPixiStage(): void {
  const app = PixiManager.app
  if (!app) return
  const label = ELEMENT_FLAG.UI
  const layerContainer = byLabelFindChild(label, app.stage)
  if (!layerContainer) return
  /* 1. 坐标起始点的切换 */
}

export function debugPixiAppRender(): void {
  const app = PixiManager.app
  if (!app) return
  const label = ELEMENT_FLAG.UI
  const layerContainer = byLabelFindChild(label, app.stage)
  if (!layerContainer) return
}

export function debugPixiAppRenderer(): void {
  const app = PixiManager.app
  if (!app) return
  const label = ELEMENT_FLAG.UI
  const layerContainer = byLabelFindChild(label, app.stage)
  if (!layerContainer) return
}

export default debugPixiStage
