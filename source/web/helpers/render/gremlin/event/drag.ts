import { CURSOR } from "@/common/cursor"
import RenderSelector from "@/helpers/render/gremlin/controller/selector"
import { isContainer } from "@/helpers/render/gremlin/functions/is"
import { webLog } from "@/utils/log"
import {
  type Application,
  type Container,
  type FederatedPointerEvent,
  Point
} from "pixi.js"

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

export class TargetDrag {
  private static _instance: TargetDrag
  private static _stage: Container
  private static _currentTarget: Container | null = null
  private static _startPosition = new Point()
  private static _startOffset = new Point()
  private static _lastTarget: Container

  static getInstance(): TargetDrag {
    if (!TargetDrag._instance) {
      TargetDrag._instance = new TargetDrag()
    }
    return TargetDrag._instance
  }

  static init(stage: Container): void {
    TargetDrag._stage = stage
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

  static pointermove(_e: FederatedPointerEvent): void {
    const target = TargetDrag._currentTarget
    if (target) {
      /* 1. 更改 图形 与 容器 之间的选择 */
      /* 2. 组合图形的选中 */
      // TODO: 这里是直接更改的图形的坐标，可能需要的是更改 Container 的坐标
      // target.parent.toLocal(e.global.clone(), undefined, target.position)
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
