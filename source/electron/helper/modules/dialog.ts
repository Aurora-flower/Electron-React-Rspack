import { dialog } from 'electron';

export function openDialog() {}

/* ***** ***** ***** ***** AppMessage 消息弹窗  (Distributor) ***** ***** ***** ***** */

/**
 * AppMessage 消息弹窗
 * @remarks
 * The `window` argument allows the dialog to attach itself to a parent window, making it modal.
 *
 * ```ts
 * showErrorBox(title: string, content: string): void;
 *
 * showMessageBox(window: BaseWindow, options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>;
 *
 * showMessageBoxSync(window: BaseWindow, options: MessageBoxSyncOptions): number;
 * ```
 *
 * 注意📢: showMessageBox、showMessageBoxSync 的 window 参数可以不传入，单个参数时对应 options
 */
export class AppMessage {
  static async showErrorBox(title: string, content: string) {
    dialog.showErrorBox(title, content);
  }

  static async showMessageBox(
    window: Electron.BaseWindow,
    options: Electron.MessageBoxOptions
  ): Promise<Electron.MessageBoxReturnValue> {
    return dialog.showMessageBox(window, options);
  }
}
