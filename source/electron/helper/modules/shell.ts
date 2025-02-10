/**
 * @file 封装 electron shell 方法
 */
import { shell } from 'electron';

/**
 * 打开外部链接
 * @param url 链接
 */
export function openExternal(
  _event: Electron.IpcMainEvent,
  url: string
) {
  shell.openExternal(url);
}
