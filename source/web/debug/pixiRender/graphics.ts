import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import PixiManager from "@/helpers/render/gremlin/manager"

export function debugPixiGraphic(): void {
  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return

  /* 1. rect 点位绘制与 graphics 点位绘制的区别 */
}
