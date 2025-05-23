import { byLabelFindElement } from "@/helpers/render/gremlin/functions/find"
import PixiManager from "@/helpers/render/gremlin/manager"

export function debugPixiGraphic(): void {
  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = byLabelFindElement("layer", app.stage)
  if (!layerContainer) return
}
