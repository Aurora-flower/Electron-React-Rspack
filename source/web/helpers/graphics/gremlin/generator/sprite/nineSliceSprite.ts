import type { Container, NineSliceSpriteOptions } from "pixi.js"
import { NineSliceSprite, Texture } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

export function createNineSliceSprite(
  parent: Container | undefined = undefined,
  options: NineSliceSpriteOptions = {
    texture: Texture.EMPTY
  },
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): NineSliceSprite {
  const sprite = new NineSliceSprite({
    // TODO: NineSliceSprite 默认值的设置
    ...options
  })
  if (parent) {
    viewAppend(parent, [sprite], config)
  }
  return sprite
}
