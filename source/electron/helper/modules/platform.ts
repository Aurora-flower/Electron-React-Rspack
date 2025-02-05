/**
 * @file 获取平台信息
 */

/**
 * 获取平台信息
 * @param {string} platform 平台名称
 * @returns {boolean | string}
 */
export function getPlatform(
  platform?: string
): boolean | string {
  if (platform) {
    return process.platform === platform;
  } else {
    return process.platform;
  }
}

/**
 * 是否为 Windows 平台
 * @returns {boolean}
 */
export function isWin(): boolean {
  return getPlatform('win32') as boolean;
}
