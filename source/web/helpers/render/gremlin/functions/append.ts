import type { Container } from "pixi.js"

export function appendChild(
  parent: Container | undefined = undefined,
  child: Container | undefined = undefined,
  isTopIndex = false
): void {
  if (!parent || !child) return
  if (isTopIndex) {
    parent.addChildAt(child, parent.children.length)
  } else {
    parent.addChild(child)
  }
}
