import { addStageWheel } from "@/helpers/render/gremlin/event/wheel"
import {
  getTargetType,
  isContainer
} from "@/helpers/render/gremlin/functions/is"
import { webLog } from "@/utils/log"
import type { Application } from "pixi.js"

export function setupStageHook(app: Application): void {
  const stage = app.stage
  stage.hitArea = app.screen
  stage.interactive = true
  stage.eventMode = "static"
  addStageWheel(stage)
  webLog(
    "wheel",
    "setupStageHook",
    getTargetType(stage),
    isContainer(stage),
    app.screen,
    stage.isInteractive()
  )
}
