import { resolvePath } from "@main/node/path/resolvePath"
import { BrowserWindow } from "electron"

export function createWorkerWindow(): void {
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  worker.loadURL(resolvePath("../public/pages/worker/index.html"))
}
