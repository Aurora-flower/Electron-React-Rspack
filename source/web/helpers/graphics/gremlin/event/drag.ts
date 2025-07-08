import {
  type Application,
  type Container,
  type FederatedPointerEvent,
  Point
} from "pixi.js"
import { CURSOR } from "@/common/cursor"
import RenderSelector from "@/helpers/graphics/gremlin/controller/selector"
import { isContainer } from "@/helpers/graphics/gremlin/functions/is"
import type { BaseNodeInfoModel } from "@/logic/algorithm/layout"
import { formatNumberPrecision } from "@/utils/functions/math"
import { getPoint } from "@/utils/functions/usually"
import { webLog } from "@/utils/log"

// const mousePosBefore = e.getLocalPosition(target.parent)
// const mouseLocalBefore = target.toLocal(mousePosBefore)
// const mouseLocalAfter = target.toLocal(mousePosBefore);
// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())

export function addStageDrag(app: Application): void {
  const stage = app.stage
  if (!stage) return
  TargetDrag.init(stage)
}

export function getRecursiveScale(
  element: Container,
  prop: "x" | "y",
  _breakCondition?: (element: Container) => boolean
): number {
  let scale = element.scale[prop]
  let parent = element.parent
  while (parent) {
    scale *= parent.scale[prop]
    parent = parent.parent
  }
  return scale
}

export class TargetDrag {
  private static _instance: TargetDrag
  private static _stage: Container
  private static _currentTarget: Container | null = null
  private static _startPosition = new Point()
  private static _startOffset = new Point()
  private static _lastTarget: Container
  private static _pos = new Point()
  private static _point = getPoint()
  // private static _lastKey = ""
  // private static _currentKey = ""
  private static _currentData: BaseNodeInfoModel
  static _isDragging = false

  static getInstance(): TargetDrag {
    if (!TargetDrag._instance) {
      TargetDrag._instance = new TargetDrag()
    }
    return TargetDrag._instance
  }

  static init(stage: Container): void {
    TargetDrag._stage = stage
    TargetDrag._stage.on("pointerdown", () => {
      // TODO: 点击空白区域，取消选中；或者取消 markTarget，为全局元素挂载
    })
    TargetDrag._stage.on("pointerup", TargetDrag.pointerup)
    TargetDrag._stage.on("pointerupoutside", TargetDrag.pointerupoutside)
  }

  static markTarget(target: Container): void {
    if (
      target.isInteractive() &&
      !isContainer(target) &&
      TargetDrag._lastTarget !== target
    ) {
      TargetDrag._lastTarget = target
      // target.removeAllListeners();
      target.on("pointerdown", TargetDrag.pointerdown)
    }
  }

  static pointerdown(e: FederatedPointerEvent): void {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 0) return
    TargetDrag._currentTarget = e.target
    e.target.cursor = CURSOR.Move
    // e.target.isRefresh ?? false
    RenderSelector.select(e.target)
    TargetDrag._stage.on("pointermove", TargetDrag.pointermove)
  }

  static pointermove(e: FederatedPointerEvent): void {
    e.stopPropagation()
    e.preventDefault()
    const target = TargetDrag._currentTarget
    if (target) {
      const parent = target.parent
      /* 1. 更改 图形 与 容器 之间的选择 */
      /* 2. 组合图形的选中 */
      // TODO: 这里是直接更改的图形的坐标，可能需要的是更改 Container 的坐标
      // target.parent.toLocal(e.global.clone(), undefined, target.position)
      target.cursor = CURSOR.Move
      const position = TargetDrag._currentData?.position ?? { x: 0, y: 0 }
      const newPos = {
        x: e.clientX,
        y: e.clientY
      }
      const factor = {
        x: getRecursiveScale(parent, "x"),
        y: getRecursiveScale(parent, "y")
      }
      const offset = {
        x: formatNumberPrecision(newPos.x - TargetDrag._pos.x / factor.x),
        y: formatNumberPrecision(newPos.y - TargetDrag._pos.y / factor.y)
      }
      TargetDrag._point = getPoint(offset.x + position.x, offset.y + position.y)
      // console.log(`移动的距离：${offset.x}:${offset.y}`, isLimitX, isLimitY);
      TargetDrag._isDragging = true
      if (TargetDrag._currentTarget) {
        TargetDrag._currentTarget?.position.set(
          TargetDrag._point.x,
          TargetDrag._point.y
        )
      }
      webLog(
        "drag",
        "pointermove",
        target,
        TargetDrag._startPosition,
        TargetDrag._startOffset
      )
    }
  }

  static pointerup(_e: FederatedPointerEvent): void {
    TargetDrag.offMove()
  }

  static pointerupoutside(_e: FederatedPointerEvent): void {
    TargetDrag.offMove()
  }

  static offMove(): void {
    if (TargetDrag._currentTarget) {
      TargetDrag._currentTarget.cursor = CURSOR.Normal
      TargetDrag._currentTarget = null
    }
    TargetDrag._stage.off("pointermove", TargetDrag.pointermove)
  }
}
