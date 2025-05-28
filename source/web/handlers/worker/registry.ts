import { webError, webLog } from "@/utils/log"

export function enableWorker(
  scriptURL: string | URL,
  message: unknown,
  options?: WorkerOptions
): void {
  const worker = new Worker(scriptURL, options)
  worker.postMessage(message)
  worker.onmessage = (event): void => {
    webLog("registry", "Main thread received message", event.data, scriptURL)
    worker.terminate() // Stop Worker
  }
  worker.onerror = (error: ErrorEvent): void => {
    webError("registry", "enableWorker error", error, scriptURL)
  }
}
