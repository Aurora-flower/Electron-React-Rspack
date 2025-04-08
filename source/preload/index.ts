import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("IPC", {
  dispatch: (...args: unknown[]) => ipcRenderer.invoke("dispatch", ...args),
  sender: (...args: unknown[]) => ipcRenderer.send("handler", ...args)
});
