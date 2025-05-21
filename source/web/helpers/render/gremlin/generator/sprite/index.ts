import { type Container, Sprite, type SpriteOptions } from "pixi.js"

export function createSprite(
  options: SpriteOptions = {},
  _config = {},
  parent?: Container
): Sprite {
  const sprite = new Sprite(options)
  if (parent) {
    parent.addChild(sprite)
  }
  return sprite
}
