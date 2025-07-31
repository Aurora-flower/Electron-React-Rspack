/**
 * @file 对错误对象进行处理的模块
 */

/**
 * @summary 获取错误信息
 * @description
 * 当错误对象为 Error 类型时，返回错误信息；否则返回错误对象本身。
 */
export function errorMessage(e: unknown): string | unknown {
  return e instanceof Error ? e.message : e
}
