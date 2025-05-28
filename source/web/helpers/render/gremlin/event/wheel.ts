import PixiManager from "@/helpers/render/gremlin"
import { webLog } from "@/utils/log"
import CommonUtility from "@/utils/utility"
import type { Container, FederatedWheelEvent } from "pixi.js"

const ZOOM_SPEED = 0.1

// const SCALE_RATIO = 0.1;

export function addStageWheel(stage: Container): void {
  const app = PixiManager.getApp()
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
    PixiManager.initCanvas()

    // const mousePosBefore = e.getLocalPosition(sceneRoot.parent);
    // const mouseLocalBefore = sceneRoot.toLocal(mousePosBefore);
    // sceneRoot.scale.set(canvasScale.x, canvasScale.y);
    // const mouseLocalAfter = sceneRoot.toLocal(mousePosBefore);
    // sceneRoot.position.x +=
    //   (mouseLocalAfter.x - mouseLocalBefore.x) * canvasScale.x * SCALE_RATIO;
    // sceneRoot.position.y +=
    //   (mouseLocalAfter.y - mouseLocalBefore.y) * canvasScale.y * SCALE_RATIO;

    // webLog(
    //   "PixiManager",
    //   "wheelHandler",
    //   e.deltaY,
    //   e.deltaX,
    //   e.deltaZ,
    //   e.deltaMode,
    //   stage,
    //   // stage.getSize(),
    //   app.renderer.width,
    //   app.renderer.height
    // )
    console.log("wheelHandler", e, stage)
  }, 1500)

  webLog("PixiManager", "addStageWheel", app, stage)

  stage.on("wheel", wheelHandler)
  stage.on("pointerdown", () => {
    stage.cursor = "default"
  })
}
