import { dialog } from "electron"
import type {
  BaseWindow,
  MessageBoxOptions,
  MessageBoxReturnValue,
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue
} from "electron"

export class AppDialog {
  private static _instance: AppDialog
  private static lastUserChoice: string | string[]
  private static dialogCount = 0

  static getInstance(): AppDialog {
    if (!AppDialog._instance) {
      AppDialog._instance = new AppDialog()
    }
    return AppDialog._instance
  }

  static getLastUserChoice(): string | string[] {
    return AppDialog.lastUserChoice
  }

  static async openDialog(
    options: OpenDialogOptions
  ): Promise<OpenDialogReturnValue> {
    return dialog.showOpenDialog({
      ...options
    })
  }

  static async saveDialog(
    options: SaveDialogOptions
  ): Promise<SaveDialogReturnValue> {
    return dialog.showSaveDialog({
      ...options
    })
  }
}

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
