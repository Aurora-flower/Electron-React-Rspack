const PIXI_TARGET_TYPE = {
  Container: "Container",
  Graphics: "Graphics",
  Sprite: "Sprite",
  Text: "Text"
}

export function getTargetType<T>(target: T): string {
  const type = target?.constructor?.name ?? ""
  return type.replace("_", "")
}

export function isContainer<T>(target: T): boolean {
  return Boolean(target) && getTargetType(target) === PIXI_TARGET_TYPE.Container
}

export function isGraphics<T>(target: T): boolean {
  return Boolean(target) && getTargetType(target) === PIXI_TARGET_TYPE.Graphics
}

export function isSprite<T>(target: T): boolean {
  return Boolean(target) && getTargetType(target) === PIXI_TARGET_TYPE.Sprite
}

export function isText<T>(target: T): boolean {
  return Boolean(target) && getTargetType(target) === PIXI_TARGET_TYPE.Text
}
