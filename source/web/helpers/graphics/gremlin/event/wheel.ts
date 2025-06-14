import { CURSOR } from "@/common/cursor"
import PixiManager from "@/helpers/graphics/gremlin"
import type { Application, FederatedWheelEvent } from "pixi.js"

const ZOOM_SPEED = 0.05
// const SCALE_RATIO = 0.1;

export function addStageWheel(app: Application): void {
  const stage = app.stage
  if (!stage) return
  const wheelHandler =
    // CommonUtility.throttle(
    (ev: unknown): void => {
      const e = ev as FederatedWheelEvent
      e.preventDefault()
      e.stopPropagation()
      stage.cursor = e.deltaY > 0 ? CURSOR.Out : CURSOR.In
      const delta = e.deltaY
      const canvasScale = PixiManager.getZoom()
      const zoomFactor =
        delta > 0 ? canvasScale - ZOOM_SPEED : canvasScale + ZOOM_SPEED
      // const newZoom = canvasScale * zoomFactor
      const mousePosition = e.global.clone() // 获取鼠标在画布上的位置（缩放中心点）
      PixiManager.setZoom(zoomFactor, mousePosition)
    }
  // , 300)
  stage.on("wheel", wheelHandler)
}
