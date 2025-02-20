/**
 * @file 日志输出
 */

// import Logger from 'electron-log';
import { Environment } from '@/common/constant';

interface LogOptions {
  /**
   * 模块标识 - scriptModuleId
   */
  id: string;
  /**
   * 签名(标识符)
   */
  sign: string;
  /**
   * 输出类型
   */
  type?: 'log' | 'error' | 'warn' | 'info';
}

/**
 * @file 用于在调试模式下输出日志。
 */
export function debugLog(
  options: LogOptions,
  ...args: unknown[]
) {
  if (
    process.env?.NODE_ENV === Environment.Prod &&
    process.env?.IS_DEBUG === 'false'
  ) {
    return;
  }
  const sign = options.sign || 'DEBUG';
  const moduleId = options.id || '?unknown';
  const params = args.length > 0 ? args : null;

  console.log(`>>> Source [ ${moduleId} ] - ${sign}: `, params);
}
