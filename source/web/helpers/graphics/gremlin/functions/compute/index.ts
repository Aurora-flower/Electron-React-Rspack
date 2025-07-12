import type { Container } from "pixi.js"

export function getCumulativeScale(
  element: Container,
  prop: "x" | "y",
  _breakCondition?: (element: Container) => boolean
): number {
  if (!element) {
    return 1
  }
  let scale = element.scale[prop]
  let parent = element.parent
  while (parent) {
    scale *= parent.scale[prop]
    parent = parent.parent
  }
  return scale
}

// export function getAbsolutePosition(
//   child: AnyModel,
//   ancestor: AnyModel
// ): PointModel {
//   const childPosition = child.position.clone()
//   let currentParent = child.parent
//   if (!currentParent) {
//     return childPosition
//   }
//   const childScale = {
//     x: getCumulativeScale(currentParent, "x"),
//     y: getCumulativeScale(currentParent, "y")
//   }
//   let childAbsoluteX = childPosition.x * (childScale.x ?? 1)
//   let childAbsoluteY = childPosition.y * (childScale.y ?? 1)
//   while (currentParent?.sid === ancestor?.sid) {
//     const parentPostion = currentParent.position.clone()
//     const ancestor = currentParent.parent
//     const parentScale = {
//       x: getCumulativeScale(ancestor, "x"),
//       y: getCumulativeScale(ancestor, "y")
//     }
//     childAbsoluteX += parentPostion.x * (parentScale.x ?? 1)
//     childAbsoluteY += parentPostion.y * (parentScale.y ?? 1)
//     currentParent = ancestor
//   }
//   return {
//     x: childAbsoluteX,
//     y: childAbsoluteY
//   }
// }
