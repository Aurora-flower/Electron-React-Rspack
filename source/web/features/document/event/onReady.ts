import { useLoading } from "@/features/document/mod/loading"

export function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"] // "complete" | "interactive" | "loading"
): Promise<boolean> {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

export function domLoadAfter(): void {
  let timer: AnyModel // number
  const { appendLoading, removeLoading } = useLoading()
  document.addEventListener("DOMContentLoaded", () => {
    domReady().then(() => {
      appendLoading()
      timer = setTimeout(() => {
        removeLoading()
        if (timer) {
          clearTimeout(timer)
        }
      }, 2000)
    })
  })
}
