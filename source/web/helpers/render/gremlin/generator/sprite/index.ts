import { type Container, Sprite, type SpriteOptions, Texture } from "pixi.js"

export function createSprite(
  parent: Container | undefined = undefined,
  options: SpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {}
): Sprite {
  const sprite = new Sprite(options)
  if (parent) {
    parent.addChild(sprite)
  }
  return sprite
}
