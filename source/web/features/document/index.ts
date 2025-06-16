type ElementGetterWay = "selector" | "id"

export function getDomElement(
  parameter: string,
  way: ElementGetterWay = "selector"
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
