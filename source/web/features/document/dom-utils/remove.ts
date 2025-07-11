export function clearElement(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

export function removeElementsByTag(
  parent: HTMLElement,
  tagName: string
): void {
  const elements = Array.from(parent.children).filter(
    child => child.tagName.toLowerCase() === tagName.toLowerCase()
  )
  elements.forEach(el => el.remove())
}
