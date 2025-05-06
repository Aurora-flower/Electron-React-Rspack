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
    window.dispatchEvent(
      new MessageEvent("message", {
        data: message
      })
    )
  }
)
