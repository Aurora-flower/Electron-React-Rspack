import { webLog } from "@/utils/log"
import type { Application } from "pixi.js"

export function setupStageHook(app: Application): void {
  webLog(
    "PixiManager",
    "setupStageHook",
    `Type: ${app.stage.constructor.name}`,
    app.stage.constructor.name === "Container",
    app.stage.isInteractive()
  )
}
