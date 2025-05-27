import {
  getTargetType,
  isContainer
} from "@/helpers/render/gremlin/functions/is"
import { webLog } from "@/utils/log"
import type { Application, Container, FederatedWheelEvent } from "pixi.js"

export function setupStageHook(app: Application): void {
  addStageWheel(app.stage)
  webLog(
    "wheel",
    "setupStageHook",
    getTargetType(app.stage),
    isContainer(app.stage),
    app.stage.isInteractive()
  )
}

export function addStageWheel(stage: Container): void {
  stage.interactive = true
  stage.eventMode = "static"
  function wheelHandler(e: FederatedWheelEvent): void {
    e.preventDefault()
    e.stopPropagation()
    webLog(
      "PixiManager",
      "wheelHandler",
      e.deltaY,
      e.deltaX,
      e.deltaZ,
      e.deltaMode
    )
  }

  stage.on("wheel", wheelHandler)
}
