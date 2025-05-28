import PixiManager from "@/helpers/render/gremlin"
import type { Application, FederatedWheelEvent } from "pixi.js"

const ZOOM_SPEED = 0.1
// const SCALE_RATIO = 0.1;

export function addStageWheel(app: Application): void {
  const stage = app.stage
  if (!stage) return
  const wheelHandler = (e: FederatedWheelEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    stage.cursor = "zoom-in"
    // stage.cursor = "zoom-out"
    const delta = e.deltaY
    const canvasScale = PixiManager.getZoom()
    const zoomFactor = delta > 0 ? 1 - ZOOM_SPEED : 1 + ZOOM_SPEED
    const zoom = canvasScale * zoomFactor
    PixiManager.setZoom(zoom)
    PixiManager.initCanvas()
  }
  stage.on("wheel", wheelHandler)
}
