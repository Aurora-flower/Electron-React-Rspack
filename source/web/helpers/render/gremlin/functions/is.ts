import {
  Container,
  Graphics,
  HTMLText,
  NineSliceSprite,
  Sprite,
  Text
} from "pixi.js"

const PIXI_TARGET_TYPE = {
  Container: Container.prototype?.constructor?.name ?? "Container",
  Graphics: Graphics.prototype?.constructor?.name ?? "Graphics",
  Sprite: Sprite.prototype?.constructor?.name ?? "Sprite",
  NineSliceSprite:
    NineSliceSprite.prototype?.constructor?.name ?? "NineSliceSprite",
  Text: Text.prototype?.constructor?.name ?? "Text",
  HTMLText: HTMLText.prototype?.constructor?.name ?? "HTMLText"
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

export function isNineSliceSprite<T>(target: T): boolean {
  return (
    Boolean(target) &&
    getTargetType(target) === PIXI_TARGET_TYPE.NineSliceSprite
  )
}

export function isHTMLText<T>(target: T): boolean {
  return Boolean(target) && getTargetType(target) === PIXI_TARGET_TYPE.HTMLText
}
