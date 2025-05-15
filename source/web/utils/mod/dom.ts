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

export const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement): HTMLElement | null {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
    return null
  },

  remove(parent: HTMLElement, child: HTMLElement): HTMLElement | null {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
    return null
  }
}

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

export function domLoadAfter(): void {
  let timer: number
  const { appendLoading, removeLoading } = useLoading()
  document.addEventListener("DOMContentLoaded", () => {
    domReady().then(() => {
      appendLoading()
      timer = setTimeout(() => {
        removeLoading()
        timer && clearTimeout(timer)
      }, 2000)
    })
  })
}

export function getDomElement(
  parameter: string,
  way: "selector" | "id" = "selector"
): HTMLElement | null {
  if (way === "selector") {
    return document.querySelector(parameter) as HTMLElement
  } else if (way === "id") {
    return document.getElementById(parameter) as HTMLElement
  }
  return null
}

export function getRootElement(root: string | HTMLElement): HTMLElement {
  return typeof root === "string" ? (getDomElement(root) as HTMLElement) : root
}
