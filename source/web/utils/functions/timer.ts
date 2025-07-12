export function selfCleanTimer(callback: FunctionType, delay = 1000): void {
  const timer = setTimeout(() => {
    callback()
    clearTimeout(timer)
  }, delay)
}

export function delay(duration: number, callback: () => void): void {
  const start = Date.now()
  while (Date.now() - start < duration) {
    callback()
  }
}
