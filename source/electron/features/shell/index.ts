import { shell } from "electron"

export function openExternal(_event: Electron.IpcMainEvent, url: string): void {
  shell.openExternal(url)
}
