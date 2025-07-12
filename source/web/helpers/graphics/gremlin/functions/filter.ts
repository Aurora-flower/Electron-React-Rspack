import type { Container } from "pixi.js"

export function getElementByLabel(
  label: string,
  root: Container,
  isRecursive: boolean = true
): Container | null {
  if (!root) {
    return null
  }
  // if (isRecursive) {
  //   for (const child of root.children) {
  //     const element = getElementByLabel(label, child, isRecursive)
  //     if (element) {
  //       return element
  //     }
  //   }
  // }
  return root.getChildByLabel(label, isRecursive)
}
