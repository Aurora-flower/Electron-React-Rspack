import { Environment } from '@/common/constant';

/**
 * @file 用于在调试模式下输出日志。
 */
export function debugLog(
  scriptModuleId: string,
  sign: string /* 标识符 */,
  isMain: boolean /* 是否是主进程、渲染进程 */,
  ...args: unknown[]
) {
  if (
    process.env?.NODE_ENV === Environment.Prod &&
    !process.env?.IS_DEBUG
  ) {
    return;
  }

  if (isMain) {
    // ERR_CONNECTION_REFUSED
    // 记录 main 进程的日志
    // const fs = require('node:fs');
    console.log(
      '记录日志:',
      process.env?.NODE_ENV,
      process.env?.IS_DEBUG
    );
  }

  console.log(
    `>>> Origin [ ${scriptModuleId} ] - ${sign}: `,
    args.length > 0 ? args : null
  );
}
