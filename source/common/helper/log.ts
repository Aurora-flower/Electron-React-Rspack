// import Logger from 'electron-log';
import { Environment } from '@/common/constant';

/**
 * 记录日志
 * @param args arguments
 */
function recordLog(_args: unknown[]) {
  const LoggerModule = require('@/electron/manager/logger');
  const instance = LoggerModule.default.getInstance();
  /* 记录 main 进程的日志 */
  instance.log(_args);
  console.log(
    '>>> Arguments:',
    ...arguments,
    instance.getFilepath()
  );
}

/**
 * @file 用于在调试模式下输出日志。
 */
export function debugLog(
  scriptModuleId: string,
  sign: string /* 标识符 */,
  isMain: boolean /* 是否是主进程 */,
  ...args: unknown[]
) {
  if (
    process.env?.NODE_ENV === Environment.Prod &&
    process.env?.IS_DEBUG === 'false'
  ) {
    return;
  }

  const params = args.length > 0 ? args : null;

  if (isMain && process.env?.IS_RECORD_LOG) {
    // 注意📢： 在上下文隔离的环境中，未开启 node 环境，渲染进程执行此方法会报错 'ERR_CONNECTION_REFUSED'
    recordLog(args);
  }

  console.log(
    `>>> Origin [ ${scriptModuleId} ] - ${sign}: `,
    params
  );
}
