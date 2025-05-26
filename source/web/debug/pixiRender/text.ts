import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import PixiManager from "@/helpers/render/gremlin/manager"

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
