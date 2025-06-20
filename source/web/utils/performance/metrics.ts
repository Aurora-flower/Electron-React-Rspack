export class PerformanceMetrics {
  static logPageLoadTime(): void {
    if (window.performance) {
      console.log(`Page load time: ${performance.now()} ms`)
    }
  }
}
