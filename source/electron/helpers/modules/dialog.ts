import { dialog } from "electron"
import type {
  BaseWindow,
  MessageBoxOptions,
  MessageBoxReturnValue,
  OpenDialogOptions,
  SaveDialogOptions
} from "electron"

export class AppDialog {
  private static _instance: AppDialog | null = null
  private static lastUserChoice: string | string[] | null = null
  static getInstance() {
    if (!AppDialog._instance) {
      AppDialog._instance = new AppDialog()
    }
    return AppDialog._instance
  }

  static getLastUserChoice() {
    return AppDialog.lastUserChoice
  }

  static async openDialog(options: OpenDialogOptions) {
    return dialog.showOpenDialog({
      ...options
    })
  }

  static async saveDialog(options: SaveDialogOptions) {
    return dialog.showSaveDialog({
      ...options
    })
  }
}

export class AppMessage {
  static async showErrorBox(title: string, content: string) {
    dialog.showErrorBox(title, content)
  }

  static async showMessageBox(
    window: BaseWindow,
    options: MessageBoxOptions
  ): Promise<MessageBoxReturnValue> {
    return dialog.showMessageBox(window, options)
  }
}
