import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"

function debugPixiText(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}

export function debugPixiHTMLText(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}

export default debugPixiText
