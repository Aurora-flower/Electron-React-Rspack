import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"
import type { Container } from "pixi.js"

export function appendChild(
  parent: Container,
  child: Container,
  isNoramalAppend = true,
  zIndex = 0
): void {
  if (isNoramalAppend) {
    parent.addChild(child)
  } else {
    parent.addChildAt(child, zIndex ?? parent.children.length)
  }
}

export function viewAppend(
  parent: Container | undefined = undefined,
  child: Container | undefined = undefined,
  config: Partial<ConfigModel> = {}
): void {
  if (!parent || !child) return
  appendChild(parent, child, config.isNormalAppend, config.zIndex)
}
