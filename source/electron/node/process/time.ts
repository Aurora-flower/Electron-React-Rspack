export function getElapsedTime(): number {
  return process.uptime() // run time
}

export function getMemoryUsage(): NodeJS.MemoryUsage {
  return process.memoryUsage()
}

export function forceExit(): void {
  process.exit(101)
}

export function getHighAccuracyTime(): PointArray {
  return process.hrtime()
}
