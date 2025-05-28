import type { Application, Container, FederatedPointerEvent } from "pixi.js"

// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())
// e.stopPropagation();
// e.preventDefault();
class DragEvent {
  private _target: Container
  private _stage: Container

  constructor(app: Application, target: Container) {
    this._target = target
    this._stage = app.stage
    this._stage.eventMode = "static"
    this._stage.hitArea = app.screen
    this._target.on("pointerdown", this.pointerdown)
    this._stage.on("pointermove", this.pointermove)
    this._stage.on("pointerup", this.pointerup)
    this._stage.on("pointerupoutside", this.pointerupoutside)
  }

  /* 挂载给对象 */
  pointerdown(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    this._target = e.target
    this._stage.on("pointermove", this.pointermove)
  }

  pointermove(e: FederatedPointerEvent): void {
    if (this._target) {
      this._target.cursor = "move"
      this._target.parent.toLocal(
        e.global.clone(),
        undefined,
        this._target.position
      )
      const mousePosBefore = e.getLocalPosition(this._target.parent)
      const mouseLocalBefore = this._target.toLocal(mousePosBefore)
      // const mouseLocalAfter = this._target.toLocal(mousePosBefore);
      console.log("[TEST]", mouseLocalBefore, mousePosBefore)
    }
  }

  pointerup(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    this._stage.off("pointermove", this.pointermove)
  }

  pointerupoutside(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    this._stage.off("pointermove", this.pointermove)
  }
}

export default DragEvent
