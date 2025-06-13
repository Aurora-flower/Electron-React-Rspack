import { app } from "electron"

export function onBeforeQuit(): void {
  app.on("before-quit", () => {})
}
