import { app } from "electron"

export function getIsPackage(): boolean {
  return app.isPackaged
}
