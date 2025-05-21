import type { Container, NineSliceSpriteOptions } from "pixi.js"
import { NineSliceSprite, Texture } from "pixi.js"

export function createNineSliceSprite(
  parent: Container | undefined = undefined,
  options: NineSliceSpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {}
): Container {
  const plane9 = new NineSliceSprite(options)
  if (parent) {
    parent.addChild(plane9)
  }
  return plane9
}
// clipping
