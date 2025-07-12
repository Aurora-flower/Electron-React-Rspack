import {
  Container,
  Graphics,
  HTMLText,
  NineSliceSprite,
  Sprite,
  ViewContainer
} from "pixi.js"

export function isContainer<T>(target: T): boolean {
  return (
    Boolean(target) &&
    target instanceof Container &&
    target instanceof ViewContainer === false
  )
}

export function isViewContainer<T>(target: T): boolean {
  return Boolean(target) && target instanceof ViewContainer
}

export function isGraphics<T>(target: T): boolean {
  return Boolean(target) && target instanceof Graphics
}

export function isSprite<T>(target: T): boolean {
  return Boolean(target) && target instanceof Sprite
}

export function isText<T>(target: T): boolean {
  return Boolean(target) && target instanceof Text
}

export function isNineSliceSprite<T>(target: T): boolean {
  return Boolean(target) && target instanceof NineSliceSprite
}

export function isHTMLText<T>(target: T): boolean {
  return Boolean(target) && target instanceof HTMLText
}
