import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"

export function debugPixiContainer(): void {
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
}
