function timeStamp() {
  console.log("[time stamp]", Date.now())
}

export function delay(duration: number, callback: () => void = timeStamp) {
  const start = Date.now()
  while (Date.now() - start < duration) {
    callback()
  }
}
