/**
 * @file 用于日志的生成
 */
/**
 * @file 日志输出
 */

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
    ..._args, //...arguments,
    instance.getFilepath()
  );
}

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
function debugLog(options: LogOptions, ...args: unknown[]) {
  if (
    process.env?.NODE_ENV === Environment.Prod &&
    process.env?.IS_DEBUG === 'false'
  ) {
    return;
  }
  const sign = options.sign || 'DEBUG';
  const moduleId = options.id || '?unknown';
  const params = args.length > 0 ? args : null;

  if (process.env?.IS_RECORD_LOG) {
    // 注意📢： 在上下文隔离的环境中，未开启 node 环境，渲染进程执行此方法会报错 'ERR_CONNECTION_REFUSED'
    recordLog(args);
  }

  console.log(`>>> Source [ ${moduleId} ] - ${sign}: `, params);
}

export default debugLog;
