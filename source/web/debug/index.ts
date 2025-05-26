import debugPixiSprite from "@/debug/pixiRender/sprite"
import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import { join } from "@/utils/features/url"
import { webLog } from "@/utils/log"

export function debugPixiRender(): void {
  // const matrix = calculateMatrixCoordinates(
  //   {
  //     width: 10000,
  //     height: 10000
  //   },
  //   {
  //     x: 0,
  //     y: 0
  //   }
  // )
  // webLog("debug", "matrix", matrix)
  debugPixiSprite()
}

export function debugWorker(): void {
  const workerPath = join("../../core/scripts/javascript/worker.js")
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
