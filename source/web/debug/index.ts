import type { Container } from "pixi.js"
// import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import { webLog } from "@/utils/log"

export function debugGremlinRender(layerContainer: Container): void {
  if (!layerContainer) return
}

export function debugWorker(): void {
  // if (!information) {
  //   return
  // }
  // const workerPath = "./scripts/worker/index.js"
  // enableWorker(workerPath, {
  //   type: "module"
  // })
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
