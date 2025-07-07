import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { Container, SpriteOptions } from "pixi.js"
import { Sprite } from "pixi.js"

export function createText(
  parent: Container,
  options: SpriteOptions = {},
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): Sprite {
  const sprite = new Sprite({
    // TODO: Sprite 默认值的设置
    ...options
  })
  viewAppend(parent, [sprite], config)
  return sprite
}
