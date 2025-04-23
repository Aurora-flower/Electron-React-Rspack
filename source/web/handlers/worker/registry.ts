export function enableWorker(
  scriptURL: string | URL,
  message: unknown,
  options?: WorkerOptions
) {
  const worker = new Worker(scriptURL, options);
  worker.postMessage(message);
  worker.onmessage = function (event) {
    console.log("Main thread received message:", event.data);
    worker.terminate(); // Stop Worker
  };
  worker.onerror = function (error) {
    console.error("Worker error:", error.message);
  };
}
