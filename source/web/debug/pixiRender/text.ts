import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"

function debugPixiText(): void {
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
}

export function debugPixiHTMLText(): void {
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
}

export default debugPixiText
