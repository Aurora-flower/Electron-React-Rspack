import type { Container, FederatedPointerEvent } from "pixi.js"
import { Point } from "pixi.js"
import { CURSOR } from "@/common/cursor"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Selector from "@/helpers/graphics/gremlin/controller/selector"
import { getCumulativeScale } from "@/helpers/graphics/gremlin/functions/compute"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import {
  isContainer,
  isViewContainer
} from "@/helpers/graphics/gremlin/functions/is"
import { webLog } from "@/utils/log"

// const mousePosBefore = e.getLocalPosition(target.parent)
// const mouseLocalBefore = target.toLocal(mousePosBefore)
// const mouseLocalAfter = target.toLocal(mousePosBefore);
// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())

export function addStageDrag(stage: Container): void {
  TargetDrag.init(stage)
}

export class TargetDrag {
  private static _stage: Container
  private static _pos: Point
  private static _point: Point
  private static _currentTarget: Container | null = null

  static init(stage: Container): void {
    TargetDrag._stage = stage
    TargetDrag._stage.on("pointerdown", TargetDrag.pointerdown)
    TargetDrag._stage.on("pointerup", TargetDrag.pointerup)
    TargetDrag._stage.on("pointerupoutside", TargetDrag.pointerupoutside)
  }

  static reset(): void {
    TargetDrag._pos = new Point()
    TargetDrag._point = new Point()
    TargetDrag._currentTarget = null
  }

  static pointerdown(e: FederatedPointerEvent): void {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 0) return
    const target = e.target
    const parent = target.parent
    target.cursor = CURSOR.Pointer
    if (isContainer(target)) {
      // TODO: 点击空白区域，取消选中；
      return
    }
    const originalPosition = parent.position.clone()
    const startPoint = e.global.clone()
    webLog(
      "TargetDrag",
      "pointerdown",
      e.target,
      parent,
      startPoint,
      originalPosition
    )
    // const clientPosition = {
    //   x: e.clientX,
    //   y: e.clientY
    // }
    Selector.select(target)
    TargetDrag._currentTarget = target
    TargetDrag._pos = originalPosition
    TargetDrag._point = startPoint
    TargetDrag._stage.on("pointermove", TargetDrag.pointermove)
  }

  static pointermove(e: FederatedPointerEvent): void {
    e.stopPropagation()
    e.preventDefault()
    const target = TargetDrag._currentTarget
    const targetContainer = target?.parent
    if (!targetContainer || isViewContainer(targetContainer)) {
      return
    }
    targetContainer.cursor = CURSOR.Move
    // target.parent.toLocal(e.global.clone(), undefined, target.position)
    // TODO: 当拖动面板直系子元素时，无效考虑累积缩放
    const ancestor = targetContainer.parent
    const scale = {
      x: ancestor ? getCumulativeScale(ancestor, "x") : 1,
      y: ancestor ? getCumulativeScale(ancestor, "y") : 1
    }
    const endPoint = e.global.clone()
    const offset = {
      x: (endPoint.x - TargetDrag._point.x) / scale.x,
      y: (endPoint.y - TargetDrag._point.y) / scale.y
    }
    const pos = new Point(
      TargetDrag._pos.x + offset.x,
      TargetDrag._pos.y + offset.y
    )
    targetContainer.position.copyFrom(pos) // ObservablePoint

    // TODO: 对一些相关元素进行处理
    const selector = getElementByLabel(ELEMENT_FLAG.Selector, TargetDrag._stage)
    if (selector) {
      const pos = target.getGlobalPosition().clone()
      Selector.move(pos)
    }
  }

  static pointerup(_e: FederatedPointerEvent): void {
    TargetDrag.offMove()
  }

  static pointerupoutside(_e: FederatedPointerEvent): void {
    TargetDrag.offMove()
  }

  private static offMove(): void {
    if (TargetDrag._currentTarget) {
      TargetDrag._currentTarget.cursor = CURSOR.Normal
      TargetDrag.reset()
    }
    TargetDrag._stage.off("pointermove", TargetDrag.pointermove)
  }
}
