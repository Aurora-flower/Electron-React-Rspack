import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import PixiManager from "@/helpers/render/gremlin/manager"

export function debugPixiContainer(): void {
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return
}
