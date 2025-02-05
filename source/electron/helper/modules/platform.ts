/**
 * @file 获取平台信息
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
