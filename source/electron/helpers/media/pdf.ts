import WindowManager from "@main/helpers/manager/window"
import { sendLog } from "@main/toolkit/logger"
import type { PrintToPDFOptions } from "electron"

export function printToPDF(pdf: string, options: PrintToPDFOptions = {}): void {
  const win = WindowManager.getInstance().getMainWindow()
  if (!win) return
  win.webContents.printToPDF(options).then(data => {
    // TODO: PDF 打印功能
    sendLog(
      {
        sign: "print-to-pdf",
        module: module?.id
      },
      data
    )
  })
}
