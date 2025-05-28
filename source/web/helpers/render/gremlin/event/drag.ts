import type { Application, Container, FederatedPointerEvent } from "pixi.js"

// const mousePosBefore = e.getLocalPosition(target.parent)
// const mouseLocalBefore = target.toLocal(mousePosBefore)
// const mouseLocalAfter = target.toLocal(mousePosBefore);
// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())

export function addStageElementDrag(app: Application): void {
  const stage = app.stage
  if (!stage) return
  TargetDrag.init(stage)
}

export class TargetDrag {
  private _data = {
    target: undefined
  }
  private static _target: Container
  private static _stage: Container

  constructor(target: Container) {
    target.on("pointerdown", this.pointerdown)
  }

  static init(stage: Container): void {
    TargetDrag._stage = stage
    TargetDrag._stage.on("pointermove", TargetDrag.pointermove)
    TargetDrag._stage.on("pointerup", TargetDrag.pointerup)
    TargetDrag._stage.on("pointerupoutside", TargetDrag.pointerupoutside)
  }

  /* 挂载给对象 */
  pointerdown(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    TargetDrag._target = e.target
    TargetDrag._stage.on("pointermove", TargetDrag.pointermove)
  }

  static pointermove(e: FederatedPointerEvent): void {
    if (TargetDrag._target) {
      TargetDrag._target.cursor = "move"
      TargetDrag._target.parent.toLocal(
        e.global.clone(),
        undefined,
        TargetDrag._target.position
      )
      const mousePosBefore = e.getLocalPosition(TargetDrag._target.parent)
      // const mouseLocalBefore = TargetDrag._target.toLocal(mousePosBefore)
      // const mouseLocalAfter = TargetDrag._target.toLocal(mousePosBefore);
      console.log(
        "[TEST]",
        // mouseLocalBefore,
        mousePosBefore,
        TargetDrag._target,
        TargetDrag._target.parent
      )
    }
  }

  static pointerup(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    TargetDrag._stage.off("pointermove", TargetDrag.pointermove)
  }

  static pointerupoutside(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    TargetDrag._stage.off("pointermove", TargetDrag.pointermove)
  }
}
