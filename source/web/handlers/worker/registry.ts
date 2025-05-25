import { webError, webLog } from "@/utils/log"

export function enableWorker(
  scriptURL: string | URL,
  message: unknown,
  options?: WorkerOptions
): void {
  const worker = new Worker(scriptURL, options)
  worker.postMessage(message)
  worker.onmessage = (event): void => {
    webLog("enableWorker", "Main thread received message", event.data)
    worker.terminate() // Stop Worker
  }
  worker.onerror = (error: ErrorEvent): void => {
    webError("enableWorker", "error", error)
  }
}
