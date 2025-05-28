class CommonUtility {
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
}

export default CommonUtility
