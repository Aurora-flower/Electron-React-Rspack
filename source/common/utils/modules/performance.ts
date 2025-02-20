/**
 * @file 性能相关工具类
 * 如：防抖、节流等
 */

// 增强功能说明
// 防抖函数的 immediate 模式

// 立即执行模式：首次触发立即执行，后续在停止触发 delay 时间后才可再次执行
// 典型应用：按钮防重复点击（如支付按钮）
// 节流函数的时间戳+定时器双保险

// 时间戳判断保证首次立即执行
// 定时器保证最后一次调用一定会被执行
// 典型应用：滚动加载更多内容
// /**
//  * 防抖函数 (debounce)
//  * @param {Function} fn  需要防抖的函数
//  * @param {number} delay 延迟时间(毫秒)
//  * @param {boolean} immediate 是否立即执行
//  * @return {Function} 返回防抖处理后的函数
//  */
// function debounce(fn, delay = 300, immediate = false) {
//   let timer = null;

//   return function (...args) {
//     const context = this;

//     // 清除已有定时器
//     if (timer) clearTimeout(timer);

//     // 立即执行模式
//     if (immediate && !timer) {
//       fn.apply(context, args);
//     }

//     // 设置新定时器
//     timer = setTimeout(() => {
//       timer = null;
//       // 非立即执行模式调用
//       if (!immediate) {
//         fn.apply(context, args);
//       }
//     }, delay);
//   };
// }

// /**
//  * 节流函数 (throttle)
//  * @param {Function} fn  需要节流的函数
//  * @param {number} interval 时间间隔(毫秒)
//  * @return {Function} 返回节流处理后的函数
//  */
// function throttle(fn, interval = 300) {
//   let lastTime = 0;
//   let timer = null;

//   return function (...args) {
//     const context = this;
//     const now = Date.now();

//     // 剩余时间计算
//     const remaining = interval - (now - lastTime);

//     // 清除定时器（处理最后一次调用）
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }

//     if (remaining <= 0) {
//       // 超过间隔时间，立即执行
//       fn.apply(context, args);
//       lastTime = now;
//     } else if (!timer) {
//       // 设置定时器确保最后一次调用会被执行
//       timer = setTimeout(() => {
//         fn.apply(context, args);
//         lastTime = Date.now();
//         timer = null;
//       }, remaining);
//     }
//   };
// }

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
