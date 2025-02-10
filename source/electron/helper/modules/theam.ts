/**
 * @file 主题相关
 */
import { nativeTheme } from 'electron';

export async function theamToggle(
  _event: Electron.IpcMainInvokeEvent,
  isSystem = false
): Promise<boolean> {
  nativeTheme.themeSource = isSystem
    ? 'system'
    : nativeTheme.shouldUseDarkColors
      ? 'light'
      : 'dark';
  return nativeTheme.shouldUseDarkColors /* 是否暗色主题 */;
}
