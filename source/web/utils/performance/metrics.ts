import { webLog } from "@/utils/log"

export class PerformanceMetrics {
  static logPageLoadTime(): void {
    if (window.performance) {
      webLog(
        "metrics",
        "logPageLoadTime",
        `Page load time: ${performance.now()} ms`
      )
    }
  }
}
