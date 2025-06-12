import { BaseWindow, View } from "electron"

export function createView(): void {
  const win = new BaseWindow()
  const view = new View()

  view.setBackgroundColor("red")
  view.setBounds({ x: 0, y: 0, width: 100, height: 100 })
  win.contentView.addChildView(view)
}
