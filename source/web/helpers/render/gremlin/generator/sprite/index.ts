import { type Container, Sprite, type SpriteOptions } from "pixi.js"

export function createSprite(
  parent: Container | undefined = undefined,
  options: SpriteOptions = {},
  _config = {}
): Sprite {
  const sprite = new Sprite(options)
  if (parent) {
    parent.addChild(sprite)
  }
  return sprite
}
