import debugPixiGraphic from "@/debug/pixiRender/graphics"
import debugPixiSprite from "@/debug/pixiRender/sprite"
import debugPixiText from "@/debug/pixiRender/text"
import debugPixiUI from "@/debug/pixiRender/ui"
import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import StoreManager from "@/stores/manager"
import { webLog } from "@/utils/log"

export function debugPixiRender(): void {
  debugPixiGraphic()
  debugPixiSprite()
  debugPixiText()
  debugPixiUI()
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
  debugPixiRender()
  debugWorker()
  debugIPC()
  webLog("debug", "start debug")
}

export default debug
