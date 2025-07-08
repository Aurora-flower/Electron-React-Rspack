import type { Container } from "pixi.js"
import { addStageWheel } from "@/helpers/graphics/gremlin/event/wheel"

export function setupStage(stage: Container): void {
  stage.interactive = true
  stage.eventMode = "static"
  addStageWheel(stage)
  // addStageDrag(stage)
}
