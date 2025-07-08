import { sendLog } from "@main/toolkit/logger"
import type { BrowserWindow } from "electron"
import { Menu, MenuItem } from "electron"

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
            // win.webContents.openDevTools({
            //   mode: "detach",
            //   activate: true
            // })
            sendLog({
              module: module?.id,
              sign: "打开调试工具",
              level: "info"
            })
          }
        },
        {
          label: "刷新",
          accelerator: "CmdOrCtrl+R",
          click: (menuItem, window: BrowserWindow): void => {
            window.reload()
            sendLog({
              module: module?.id,
              sign: "刷新",
              level: "info"
            })
          }
        }
        // {
        //   label: "强制刷新",
        //   accelerator: "CmdOrCtrl+Shift+R",
        //   click: (menuItem, window: BrowserWindow): void => {
        //     window.reload()
        //     window.webContents.reloadIgnoringCache()
        //     sendLog({
        //       module: module?.id,
        //       sign: "强制刷新",
        //       level: "info"
        //     })
        //   }
        // }
        // {
        //   label: "退出",
        //   accelerator: "CmdOrCtrl+Q",
        //   click: (): void => {
        //     app.quit()
        //     sendLog({
        //       module: module?.id,
        //       sign: "退出",
        //       level: "info"
        //     })
        //   }
        // }
      ]
    })
  )
  Menu.setApplicationMenu(menu)
}
