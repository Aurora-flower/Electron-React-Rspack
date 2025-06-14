import type { Container } from "pixi.js"

export function getElementByLabel(
  label: string,
  root: Container
): Container | null {
  if (!root) {
    return null
  }
  return root.getChildByLabel(label)
}
