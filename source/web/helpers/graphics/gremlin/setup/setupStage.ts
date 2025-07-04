import { addStageDrag } from "@/helpers/graphics/gremlin/event/drag"
import { addStageWheel } from "@/helpers/graphics/gremlin/event/wheel"
import type { Application } from "pixi.js"

export function setupStage(app: Application): void {
  const stage = app.stage
  stage.hitArea = app.screen
  stage.interactive = true
  stage.eventMode = "static"
  stage.hitArea = app.screen
  addStageWheel(app)
  addStageDrag(app)
}
