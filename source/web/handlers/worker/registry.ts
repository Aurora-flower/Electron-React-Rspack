import { webLog } from "@/helpers/log"
import CommonUtility from "@/utils/utility"

export function enableWorker(
  scriptURL: string | URL,
  message: unknown,
  options?: WorkerOptions
) {
  const worker = new Worker(scriptURL, options)
  worker.postMessage(message)
  worker.onmessage = event => {
    webLog("enableWorker", "Main thread received message", event.data)
    worker.terminate() // Stop Worker
  }
  worker.onerror = error => {
    webLog("enableWorker", "error", CommonUtility.errorMessage(error))
  }
}
