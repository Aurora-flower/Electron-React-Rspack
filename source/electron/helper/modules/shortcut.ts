import { globalShortcut } from 'electron';

/**
 * 注册快捷键
 * @param shortcut 快捷键
 * @param callback 回调函数
 * @returns 是否注册成功
 * @remarks
 * CommandOrControl 意指在 macOS 上使用 Command ，在 Windows/Linux 上使用 Control 。
 */
export function registerShortcut(
  shortcut: string,
  callback: () => void
): boolean {
  return globalShortcut.register(shortcut, callback);
}
