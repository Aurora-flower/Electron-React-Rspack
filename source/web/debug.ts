import { sender } from "@/helpers/event/electron"

import { enableWorker } from "@/handlers/worker/registry"

export function debugWorker(): void {
  const workerPath = new URL(
    "../../core/scripts/javascript/worker.js",
    location.href
  )?.pathname
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
  debugWorker()
  debugIPC()
}

export default debug
