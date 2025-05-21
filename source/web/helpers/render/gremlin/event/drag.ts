import type { FederatedPointerEvent } from "pixi.js"

class DragEvent {
  static pointerdown(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
  }

  static pointermove(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
    // target.cursor = 'move';
  }

  static pointerup(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
  }

  static pointerupoutside(e: FederatedPointerEvent): void {
    if (e.button !== 0) return
  }
}

export default DragEvent
// const parentPos = e.getLocalPosition(target.parent);
// const parentPos = target.toLocal(e.global.clone());
// new Point().copyFrom(e.global.clone())
// e.stopPropagation();
// e.preventDefault();
