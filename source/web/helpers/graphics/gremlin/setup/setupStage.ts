import type { Container } from "pixi.js"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import { addStageDrag } from "@/helpers/graphics/gremlin/event/drag"
import { addStageWheel } from "@/helpers/graphics/gremlin/event/wheel"

export function setupStage(stage: Container): void {
  stage.interactive = true
  stage.label = ELEMENT_FLAG.Stage
  stage.eventMode = "static"
  addStageWheel(stage)
  addStageDrag(stage)
}
