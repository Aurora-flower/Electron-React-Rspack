import { contextBridge, ipcRenderer } from "electron"

// const windowLoaded = new Promise(resolve => {
//   window.onload = resolve
// })

contextBridge.exposeInMainWorld("IPC", {
  dispatch: (...args: unknown[]) => ipcRenderer.invoke("dispatch", ...args),
  emitter: (...args: unknown[]) => ipcRenderer.send("emitter", ...args)
})

ipcRenderer.on(
  "trigger-message",
  (event: Electron.IpcRendererEvent, message: MessageEventInit) => {
    const replay: MessageEventInit<MessageEventInit<any> | undefined> = {
      data: message
    }
    window.dispatchEvent(new MessageEvent("message", replay))
  }
)
