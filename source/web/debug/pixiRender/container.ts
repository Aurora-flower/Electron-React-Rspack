import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"

export function debugPixiContainer(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}
