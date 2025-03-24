/**
 * @file Electron 应用中的系统信息收集与性能监测
 * @see {@link https://lzw.me/a/electron-app-sysinfo-stats.html 文档实例}
 * @description
 * - Node.js 中的 process 模块提供的信息
 * - Electron 中的 process 模块扩展的信息
 * - electron 提供的信息统计方法
 */

/* ***** ***** ***** ***** 获取平台信息 ***** ***** ***** ***** */

/**
 * 获取平台信息
 * @param {string} platform 平台名称
 * @returns {boolean | string}
 */
export function getPlatform(
  platform?: NodeJS.Platform
): boolean | string {
  if (platform) {
    return process.platform === platform;
  } else {
    return process.platform;
  }
}
