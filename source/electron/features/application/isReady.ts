import { app } from "electron"

export function getIsReady(): boolean {
  return app.isReady()
}
