import type { IpcRendererEvent } from "electron"
import { contextBridge, ipcRenderer } from "electron"

// const windowLoaded = new Promise(resolve => {
//   window.onload = resolve
// })

contextBridge.exposeInMainWorld("IPC", {
  dispatch: (...args: unknown[]) => ipcRenderer.invoke("dispatch", ...args),
  emitter: (...args: unknown[]) => ipcRenderer.send("emitter", ...args),
  sender: (...args: unknown[]) => ipcRenderer.send("sender", ...args)
})

ipcRenderer.on(
  "message-transmit",
  (_event: IpcRendererEvent, message: MessageEventInit) => {
    const replay: MessageEventInit<MessageEventInit<unknown> | undefined> = {
      data: message
    }
    window.dispatchEvent(new MessageEvent("message", replay))
  }
)
