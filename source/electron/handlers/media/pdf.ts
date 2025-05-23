import { writeFile } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { getWebContentsWindow } from "@main/helpers/modules/window"
import { ipcMain, shell } from "electron"

ipcMain.on("print-to-pdf", event => {
  const pdfPath = join(tmpdir(), "print.pdf")
  const win = getWebContentsWindow(event.sender)
  if (!win) return
  // 使用默认打印参数
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    writeFile(pdfPath, data, error => {
      if (error) throw error
      shell.openExternal(`file://${pdfPath}`)
      event.sender.send("wrote-pdf", pdfPath)
    })
  })
})
