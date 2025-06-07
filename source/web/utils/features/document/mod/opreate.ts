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
