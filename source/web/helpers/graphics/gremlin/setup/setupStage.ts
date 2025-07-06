import { addStageWheel } from "@/helpers/graphics/gremlin/event/wheel"
import type { Container } from "pixi.js"

export function setupStage(stage: Container): void {
  stage.interactive = true
  stage.eventMode = "static"
  addStageWheel(stage)
  // addStageDrag(stage)
}
