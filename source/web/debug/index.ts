import { debugPixiSprite } from "@/debug/pixiRender/sprite"
import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import { join } from "@/utils/inputs/url"
import { webLog } from "@/utils/log"

// https://pixijs.com/assets/eggHead.png
// https://imgur.com/T2vjvYl.png
export function debugPixiRender(): void {
  debugPixiSprite()

  /* 1. 坐标起始点的切换 */
  /* 3. 透明区的裁切 */
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
