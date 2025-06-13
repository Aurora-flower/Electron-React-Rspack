import { dialog } from "electron"
import type {
  BaseWindow,
  MessageBoxOptions,
  MessageBoxReturnValue
} from "electron"

export class AppMessage {
  static async showErrorBox(title: string, content: string): Promise<void> {
    dialog.showErrorBox(title, content)
  }

  static async showMessageBox(
    window: BaseWindow,
    options: MessageBoxOptions
  ): Promise<MessageBoxReturnValue> {
    return dialog.showMessageBox(window, options)
  }
}
