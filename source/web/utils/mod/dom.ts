export function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"] // "complete" | "interactive" | "loading"
) {
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
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },

  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  }
}

export function useLoading(
  selector = "#app",
  containerId = "loader",
  className = "app-loading-wrap"
) {
  const oDiv = document.createElement("div")
  oDiv.className = className
  oDiv.innerHTML = `<div id="${containerId}">
    <div class="loader-container">
      <!-- ... -->
    </div>
  </div>`
  return {
    appendLoading() {
      const root = document.body.querySelector(selector)
      if (!root) return
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.body, oDiv)
    }
  }
}

export function domLoadAfter() {
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
) {
  if (way === "selector") {
    return document.querySelector(parameter) as HTMLElement
  } else if (way === "id") {
    return document.getElementById(parameter) as HTMLElement
  }
}

export function getRootElement(root: string | HTMLElement) {
  return typeof root === "string" ? (getDomElement(root) as HTMLElement) : root
}
