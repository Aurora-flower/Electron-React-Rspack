import { shell } from "electron"

export function openExternal(event: Electron.IpcMainEvent, url: string): void {
  shell.openExternal(url)
}
