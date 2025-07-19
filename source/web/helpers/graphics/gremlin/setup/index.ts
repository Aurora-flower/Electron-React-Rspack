import type { Application } from "pixi.js"
import { setupApp } from "@/helpers/graphics/gremlin/setup/setupApp"
import { setupLayer } from "@/helpers/graphics/gremlin/setup/setupLayer"
import { setupStage } from "@/helpers/graphics/gremlin/setup/setupStage"

export function setupPixiApp(app: Application): void {
  const stage = app?.stage
  if (!stage) {
    return
  }
  setupApp(app)
  setupLayer(stage)
  setupStage(stage)
}
