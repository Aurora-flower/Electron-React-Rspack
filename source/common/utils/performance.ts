/**
 * @file 性能相关工具类
 * 如：防抖、节流等
 */

export class PreformanceUtility {
  /**
   * 防抖
   * @param callback 回调函数
   * @param delay 延迟时间
   * @returns
   */
  static debounce(callback: Function, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: unknown[]) => {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(
        () => callback.apply(this, args),
        wait
      );
    };
  }
}
