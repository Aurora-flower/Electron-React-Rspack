import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { formatNumberPrecision } from "@/utils/modules/digits"
import CommonUtility from "@/utils/utility"
import type { Application, FederatedWheelEvent } from "pixi.js"

const ZOOM_SPEED = 0.1
// const SCALE_RATIO = 0.1;

export function addStageWheel(app: Application): void {
  const stage = app.stage
  if (!stage) return
  const wheelHandler = CommonUtility.throttle((ev: unknown): void => {
    const e = ev as FederatedWheelEvent
    e.preventDefault()
    e.stopPropagation()
    stage.cursor = "zoom-in"
    // stage.cursor = "zoom-out"
    const delta = e.deltaY
    const canvasScale = PixiManager.getZoom()
    const zoomFactor = delta > 0 ? 1 - ZOOM_SPEED : 1 + ZOOM_SPEED
    const zoom = canvasScale * zoomFactor
    PixiManager.setZoom(zoom)
    const layer = getElementByLabel(PixiManager.elementFlag.layer, stage)
    if (layer) {
      // const mousePosBefore = e.getLocalPosition(layer)
      // const mouseLocalBefore = layer.toLocal(mousePosBefore)
      // const mouseLocalAfter = layer.toLocal(mousePosBefore)
      // layer.position.set(
      //   layer.position.x - (mouseLocalAfter.x - mouseLocalBefore.x),
      //   layer.position.y - (mouseLocalAfter.y - mouseLocalBefore.y)
      // )
      layer.scale.set(formatNumberPrecision(zoom))
    }
    PixiManager.initCanvas()
  }, 300)
  stage.on("wheel", wheelHandler)
}
