import { dialog } from "electron"
import type {
  BaseWindow,
  MessageBoxOptions,
  MessageBoxReturnValue
} from "electron/main"

class AppMessage {
  static async showErrorBox(title: string, content: string): Promise<void> {
    dialog.showErrorBox(title, content)
  }

  static async showMessageBox(
    win: BaseWindow,
    options: MessageBoxOptions
  ): Promise<MessageBoxReturnValue> {
    return dialog.showMessageBox(win, options)
  }
}

export default AppMessage
