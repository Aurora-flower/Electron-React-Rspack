import type { Container, SpriteOptions } from "pixi.js"
import { Sprite, Texture } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

export function createSprite(
  parent: Container | undefined = undefined,
  options: SpriteOptions = {
    texture: Texture.EMPTY
  },
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): Sprite {
  const sprite = new Sprite({
    // TODO: Sprite 默认值的设置
    ...options
  })
  if (parent) {
    viewAppend(parent, sprite, config)
  }
  return sprite
}
