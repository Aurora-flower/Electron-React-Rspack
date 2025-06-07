import { safeDOM } from "@/utils/features/document/mod/opreate"

export function useLoading(
  selector = "#app",
  containerId = "loader",
  className = "app-loading-wrap"
): {
  appendLoading(): void
  removeLoading(): void
} {
  const oDiv = document.createElement("div")
  oDiv.className = className
  oDiv.innerHTML = `<div id="${containerId}">
    <div class="loader-container">
      <!-- ... -->
    </div>
  </div>`
  return {
    appendLoading(): void {
      const root = document.body.querySelector(selector)
      if (!root) return
      safeDOM.append(document.body, oDiv)
    },
    removeLoading(): void {
      safeDOM.remove(document.body, oDiv)
    }
  }
}
