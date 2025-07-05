import type { Container } from "pixi.js"

export function getElementByLabel(
  label: string,
  root: Container
): Container | null {
  if (!root) {
    return null
  }
  // if (root.children.length > 0) {
  //   for (const child of root.children) {
  //     const element = getElementByLabel(label, child)
  //     if (element) {
  //       return element
  //     }
  //   }
  // }
  return root.getChildByLabel(label)
}
