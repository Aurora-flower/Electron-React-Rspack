export function getElapsedTime() {
  return process.uptime() // run time
}

export function getMemoryUsage() {
  return process.memoryUsage()
}

export function forceExit() {
  process.exit(101)
}

export function getHighAccuracyTime() {
  return process.hrtime()
}
