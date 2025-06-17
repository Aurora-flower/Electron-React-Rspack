import { DATA_TYPE_MODE, getDataType } from "@/utils/functions/dataType"

class CommonUtility {
  /**
   * @summary 节流 - 目的是限制函数在一定时间内的调用次数，保证函数在特定时间间隔内最多只执行一次。
   * @description
   * - 比如，用户在滚动页面时触发滚动事件，使用节流可以保证在一定时间内只处理一次滚动事件，避免频繁处理带来的性能问题。
   * - 应用场景：滚动、窗口大小调整等。
   */
  static throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay = 1000
  ): T {
    let lastCall = 0
    return function (this: unknown, ...args: unknown[]) {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        return fn.apply(this, args)
      }
    } as T
  }

  /**
   * @summary 防抖 - 目的是防止函数在连续触发时过于频繁的执行。只有在事件触发停止一定时间后，才执行函数。
   * @description
   * - 比如，用户输入框输入时，防抖可以确保用户停止输入一段时间后，才去执行请求，而不是每次键入都触发请求。
   * - 应用场景：搜索输入框、表单验证等。
   */
  static debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay = 1000
  ): T {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    return function (this: unknown, ...args: unknown[]) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => fn.apply(this, args), delay)
    } as T
  }

  static deepCopyJson<T>(json: T): T {
    if (getDataType(json) === DATA_TYPE_MODE.Symbol) {
      return json
    }
    return JSON.parse(JSON.stringify(json ?? ""))
  }
}

export default CommonUtility
