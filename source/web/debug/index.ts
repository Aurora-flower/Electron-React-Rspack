// import { debugPixiContainer } from "@/debug/pixiRender/container"
// import debugPixiGraphic from "@/debug/pixiRender/graphics"
import debugPixiSprite from "@/debug/pixiRender/sprite"
// import debugPixiText from "@/debug/pixiRender/text"
// import debugPixiUI from "@/debug/pixiRender/ui"
import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import StoreManager from "@/stores/memory/appStorage"
import { webLog } from "@/utils/log"
import type { Container } from "pixi.js"

export function debugPixiRender(layerContainer: Container): void {
  if (!layerContainer) return
  // debugPixiGraphic(layerContainer)
  debugPixiSprite(layerContainer)
  // debugPixiText(layerContainer)
  // debugPixiUI(layerContainer)
  // debugPixiContainer(layerContainer)
}

export function debugWorker(): void {
  const information = StoreManager.getAppInfo()
  if (!information) {
    return
  }
  const workerPath = "./scripts/worker/index.js"
  enableWorker(workerPath, {
    type: "module"
  })
}

export function debugIPC(): void {
  sender("sms:transmit", {
    source: "IPC",
    payload: {
      msg: "Hello World!"
    }
  } as Message)
}

async function debug(): Promise<void> {
  webLog("debug", "start debug")
}

export default debug
