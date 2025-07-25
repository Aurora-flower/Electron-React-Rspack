import type { Container } from "pixi.js"
import Gremlin from "@/helpers/graphics/gremlin"
import ELEMENT_FLAG from "@/helpers/graphics/gremlin/constant/elementFlag"

export function byLabelFindChild(
  label: string,
  root: Container,
  isRecursive: boolean = true
): Container | null {
  // if (!root) {
  //   return null
  // }
  // if (isRecursive) {
  //   for (const child of root.children) {
  //     const element = byLabelFindChild(label, child, isRecursive)
  //     if (element) {
  //       return element
  //     }
  //   }
  // }
  return root ? root.getChildByLabel(label, isRecursive) : null
}

export function getChildByLabel(
  label: string,
  root?: Container
): Container | null {
  if (!Gremlin.app) return null
  return byLabelFindChild(label, root ?? Gremlin.app.stage)
}

export function getSelector(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.Selector, parent)
}

export function getRoot(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.Root, parent)
}

export function getStaffLayer(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.Staff, parent)
}

export function getStage(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.Stage, parent)
}

export function getBasisLayer(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.Basis, parent)
}

export function getUiLayer(parent?: Container): Container | null {
  return getChildByLabel(ELEMENT_FLAG.UI, parent)
}
