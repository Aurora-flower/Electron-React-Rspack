/**
 * @file clipboard 剪切板操作
 */
import { clipboard } from 'electron';
import debugLog from '@/electron/tools/log';

/**
 * 获取剪贴板中的文本内容
 * @returns 返回剪贴板中的文本内容。
 */
export function getClipboard(): string {
  return clipboard.readText();
}

/**
 * 设置剪贴板中的文本内容
 * @param text 要设置的文本内容。
 */
export function setClipboard(
  _event: Electron.IpcMainInvokeEvent,
  text: string
) {
  if (text) {
    clipboard.writeText(text);
  } else {
    debugLog(
      {
        id: module.id,
        sign: 'SetClipboard'
      },
      'text is empty'
    );
  }
}
