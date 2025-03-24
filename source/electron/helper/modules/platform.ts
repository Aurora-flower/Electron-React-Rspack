/**
 * @file 平台相关的信息
 */
import { getPlatform } from './process';

/**
 * 是否为 Windows 平台
 * @returns {boolean}
 */
export function isWin(): boolean {
  return getPlatform('win32') as boolean;
}
