// 在主线程中使用 worker.onmessage，在 Worker 中使用 self.onmessage。
self.onmessage = event => {
  const data = event.data
  self.postMessage(data)
  // throw new Error("Something went wrong!")
}
