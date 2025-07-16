import { contextBridge, ipcRenderer } from "electron"
import type { IpcRendererEvent } from "electron/main"

// const windowLoaded = new Promise(resolve => {
//   window.onload = resolve
// })

contextBridge.exposeInMainWorld("IPC", {
  dispatch: (...args: ArrayType) => ipcRenderer.invoke("dispatch", ...args),
  emitter: (...args: ArrayType) => ipcRenderer.send("emitter", ...args),
  sender: (...args: ArrayType) => ipcRenderer.send("sender", ...args)
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
