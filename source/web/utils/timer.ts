export function selfCleanTimer(callback: FunctionType, delay = 1000): void {
  const timer = setTimeout(() => {
    callback()
    clearTimeout(timer)
  }, delay)
}
