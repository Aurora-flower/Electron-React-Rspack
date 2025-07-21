import type { Container, FederatedPointerEvent } from "pixi.js"
import { Point } from "pixi.js"
import { CURSOR } from "@/common/constant/cursor"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Selector from "@/helpers/graphics/gremlin/controller/selector"
import { getCumulativeScale } from "@/helpers/graphics/gremlin/functions/compute"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import {
  isContainer,
  isViewContainer
} from "@/helpers/graphics/gremlin/functions/is"
import { roundToDecimal } from "@/utils/functions/math"
import { nowTime } from "@/utils/functions/time"
// import { webLog } from "@/utils/log"

// const mousePosBefore = e.getLocalPosition(target.parent)
// const mouseLocalBefore = target.toLocal(mousePosBefore)
// const mouseLocalAfter = target.toLocal(mousePosBefore);
// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())

export function addStageDrag(stage: Container): void {
  StageDrag.init(stage)
}

class StageDrag {
  /* ***** ***** ***** ***** 公共参数 ***** ***** ***** *****  */
  private static _stage: Container
  private static _flag = -1
  private static _currentTarget: Container | null = null
  private static _currentTargetParent: Container | null = null
  private static _point: Point // GlobalPoint

  /* ***** ***** ***** ***** 左键参数 ***** ***** ***** *****  */
  private static _pos: Point

  /* ***** ***** ***** ***** 右键参数 ***** ***** ***** *****  */
  private static _root: Container | null = null
  private static _pivot: Point
  private static _velocity: Point
  private static _time: number
  private static _inertia: AnyModel

  /* ***** ***** ***** ***** 公共事件 ***** ***** ***** *****  */
  public static init(stage: Container): void {
    StageDrag._stage = stage
    StageDrag._stage.on("pointerover", (e: FederatedPointerEvent) => {
      const target = e.target
      if (isViewContainer(target)) {
        target.cursor = CURSOR.Pointer
        // TODO: 当鼠标进入某个特定的元素范围时的逻辑
      }
    })
    StageDrag._stage.on("pointerdown", StageDrag.pointerdown)
    StageDrag._stage.on("pointerup", StageDrag.pointerup)
    StageDrag._stage.on("pointerupoutside", StageDrag.pointerupoutside)
  }

  public static reset(): void {
    // StageDrag._pos = new Point()
    // StageDrag._point = new Point()
    // StageDrag._velocity = new Point()
    StageDrag._flag = -1
    StageDrag._currentTarget =
      StageDrag._currentTargetParent =
      StageDrag._root =
        null
  }

  private static pointerdown(e: FederatedPointerEvent): void {
    e.preventDefault()
    e.stopPropagation()
    const target = e.target
    const parent = target.parent
    StageDrag._currentTarget = target
    StageDrag._currentTargetParent = parent
    // if (isViewContainer(parent)) {
    //   // 不符合的、无效的容器
    //   return
    // }
    // e.getLocalPosition(parent),
    // target.toLocal(target.position, StageDrag._stage)
    // const clientPosition = {
    //   x: e.clientX,
    //   y: e.clientY
    // }
    const startPoint = e.global.clone()
    StageDrag._point = startPoint

    const btn = e.button
    StageDrag._flag = btn
    if (btn === 0) {
      // 鼠标左键点击逻辑
      StageDrag.targetPointerdown(e)
    } else if (btn === 1) {
      // 滚轮点击逻辑
    } else if (btn === 2) {
      // 鼠标右键点击逻辑
      StageDrag.stagePointerdown(e)
    }
    StageDrag._stage.on("pointermove", StageDrag.pointermove)
  }

  private static pointermove(e: FederatedPointerEvent): void {
    e.stopPropagation()
    e.preventDefault()
    // const target = e.target
    // if (isViewContainer(target)) {
    //   target.cursor = CURSOR.Move
    // }
    if (StageDrag._flag === 0) {
      StageDrag.targetPointermove(e)
    } else if (StageDrag._flag === 2) {
      StageDrag.stagePointermove(e)
    }
  }

  private static pointerup(e: FederatedPointerEvent): void {
    StageDrag.offMove(e)
  }

  private static pointerupoutside(e: FederatedPointerEvent): void {
    const target = e.target
    if (isViewContainer(target)) {
      target.cursor = CURSOR.Normal
    }
    StageDrag.offMove(e)
  }

  private static offMove(_e: FederatedPointerEvent): void {
    if (StageDrag._currentTarget) {
      StageDrag.reset()
    }
    StageDrag._stage.off("pointermove", StageDrag.pointermove)
  }

  /* ***** ***** ***** ***** 左键事件 ***** ***** ***** *****  */

  private static targetPointerdown(_e: FederatedPointerEvent): void {
    const target = StageDrag._currentTarget!
    if (isContainer(target)) {
      // TODO: 点击空白区域，取消选中；
      return
    }
    const targetContainer = StageDrag._currentTargetParent!
    const originalPosition = targetContainer.position.clone()
    Selector.select(target)
    StageDrag._pos = originalPosition
  }

  private static targetPointermove(e: FederatedPointerEvent): void {
    const targetContainer = StageDrag._currentTargetParent
    if (!targetContainer || isViewContainer(targetContainer)) {
      return
    }
    // target.parent.toLocal(e.global.clone(), undefined, target.position)
    // TODO: 当拖动面板直系子元素时，无效考虑累积缩放
    const ancestor = targetContainer.parent
    const scale = {
      x: ancestor ? getCumulativeScale(ancestor, "x") : 1,
      y: ancestor ? getCumulativeScale(ancestor, "y") : 1
    }
    const endPoint = e.global.clone()
    const offset = {
      x: (endPoint.x - StageDrag._point.x) / scale.x,
      y: (endPoint.y - StageDrag._point.y) / scale.y
    }
    const pos = new Point(
      StageDrag._pos.x + offset.x,
      StageDrag._pos.y + offset.y
    )
    targetContainer.position.copyFrom(pos) // ObservablePoint
    // TODO: 对一些相关元素进行处理
    const selector = getElementByLabel(ELEMENT_FLAG.Selector, StageDrag._stage)
    if (selector) {
      const pos = targetContainer.getGlobalPosition().clone()
      Selector.move(pos)
    }
  }

  /* ***** ***** ***** ***** 右键事件 ***** ***** ***** *****  */
  private static stagePointerdown(e: FederatedPointerEvent): void {
    StageDrag._time = nowTime()
    StageDrag._velocity = new Point()
    const root = getElementByLabel(ELEMENT_FLAG.Root, StageDrag._stage)
    if (root) {
      const endPoint = e.global.clone()
      StageDrag._point = endPoint
      StageDrag._pivot = root.pivot.clone()
      StageDrag._root = root
    }
  }

  private static stagePointermove(e: FederatedPointerEvent): void {
    const root = StageDrag._root
    if (!root) {
      return
    }
    const scale = {
      x: getCumulativeScale(root, "x"),
      y: getCumulativeScale(root, "y")
    }
    // const startTime = StageDrag._time
    // const endTime = nowTime()
    // const deltaTime = roundToDecimal(endTime - startTime, 0)
    const endPoint = e.global.clone()
    const offset = {
      x: (endPoint.x - StageDrag._point.x) / scale.x,
      y: (endPoint.y - StageDrag._point.y) / scale.y
    }
    const pivot = {
      x: roundToDecimal(StageDrag._pivot.x - offset.x, 2),
      y: roundToDecimal(StageDrag._pivot.y - offset.y, 2)
    }
    root.pivot.set(pivot.x, pivot.y)
    // TODO: 对一些相关元素进行处理
    const selector = getElementByLabel(ELEMENT_FLAG.Selector, StageDrag._stage)
    if (selector) {
      Selector.refresh()
    }
  }
}
