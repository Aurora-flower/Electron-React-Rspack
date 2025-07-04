import { sendLog } from "@main/toolkit/logger"
import { type BrowserWindow, Menu, MenuItem } from "electron"

export function registerAppMenu(): void {
  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: "保存",
      submenu: [
        {
          label: "保存",
          accelerator: "CmdOrCtrl+S",
          click: (): void => {
            sendLog({
              module: module?.id,
              sign: "保存",
              level: "info"
            })
          }
        }
      ]
    })
  )
  menu.append(
    new MenuItem({
      label: "打开项目",
      submenu: [
        {
          label: "打开项目",
          accelerator: "CmdOrCtrl+O",
          click: (): void => {
            sendLog({
              module: module?.id,
              sign: "打开项目",
              level: "info"
            })
          }
        }
      ]
    })
  )
  menu.append(
    new MenuItem({
      label: "调试",
      submenu: [
        {
          label: "打开调试工具",
          accelerator: "CmdOrCtrl+Shift+I",
          click: (menuItem, window: BrowserWindow): void => {
            window.webContents.openDevTools()
            sendLog({
              module: module?.id,
              sign: "打开调试工具",
              level: "info"
            })
          }
        }
      ]
    })
  )
  Menu.setApplicationMenu(menu)
}
