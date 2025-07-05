import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"
import type { Container } from "pixi.js"

export function appendChild(
  parent: Container,
  children: Array<Container> = [],
  isNoramalAppend = true,
  zIndex = 0
): void {
  if (isNoramalAppend) {
    parent.addChild(...children)
  } else {
    for (const child of children) {
      // 这里可能存在的问题：children 中并没有按照 zIndex 顺序添加，那么最后显示的图层可能不是预期的效果
      parent.addChildAt(child, zIndex ?? parent.children.length)
    }
  }
}

export function viewAppend(
  parent: Container | undefined = undefined,
  children: Array<Container> = [],
  config?: Partial<ConfigModel>
): void {
  if (!parent || children?.length <= 0) return
  appendChild(parent, children, config?.isNormalAppend, config?.zIndex)
}
