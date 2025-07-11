import type { Application } from "pixi.js"
import { webLog } from "@/utils/log"

export function setupApp(app: Application): void {
  app.stage.hitArea = app.screen

  // app.ticker.add(delta => {
  // rotate the container!
  // use delta to create frame-independent transform
  // webLog("setupApp", "delta", delta)
  // })
  webLog("setupApp", "info", app)
}
