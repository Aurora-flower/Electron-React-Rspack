const PIXI_TARGET_TYPE = {
  Container: "Container",
  Graphics: "Graphics",
  Sprite: "Sprite",
  Text: "Text"
}

export function getTargetType(target: unknown): string | undefined {
  const type = target?.constructor?.name ?? ""
  return type.replace("_", "")
}

export function isContainer(target: unknown): boolean {
  return getTargetType(target) === PIXI_TARGET_TYPE.Container
}

export function isGraphics(target: unknown): boolean {
  return getTargetType(target) === PIXI_TARGET_TYPE.Graphics
}

export function isSprite(target: unknown): boolean {
  return getTargetType(target) === PIXI_TARGET_TYPE.Sprite
}

export function isText(target: unknown): boolean {
  return getTargetType(target) === PIXI_TARGET_TYPE.Text
}
