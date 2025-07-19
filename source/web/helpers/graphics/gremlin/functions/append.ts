import type { Container } from "pixi.js"
// import { isContainer } from "@/helpers/graphics/gremlin/functions/is"
import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"

// export function appendChild(
//   parent: Container,
//   children: Array<Container> = [],
//   isNoramalAppend = true,
//   zIndex = 0
// ): void {
//   if (isNoramalAppend) {
//     parent.addChild(...children)
//   } else {
//     for (const child of children) {
//       // 这里可能存在的问题：children 中并没有按照 zIndex 顺序添加，那么最后显示的图层可能不是预期的效果
//       parent.addChildAt(child, zIndex ?? parent.children.length)
//     }
//   }
// }

export function viewAppend(
  parent: Container,
  children: Array<Container> | Container = [],
  _config?: Partial<ConfigModel>
): void {
  // if (!parent) return //  config?.isNormalAppend, config?.zIndex
  // TODO: 需要支持控制添加的层级
  if (Array.isArray(children)) {
    children.forEach(child => {
      parent.addChild(child)
    })
  } /* if (isContainer(children)) */ else {
    parent.addChild(children)
  }
}
