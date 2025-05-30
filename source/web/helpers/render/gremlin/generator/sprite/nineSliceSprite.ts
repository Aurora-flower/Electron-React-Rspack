import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import type { Container, NineSliceSpriteOptions } from "pixi.js"
import { NineSliceSprite, Texture } from "pixi.js"

export function createNineSliceSprite(
  parent: Container | undefined = undefined,
  options: NineSliceSpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {}
): Container {
  const plane9 = new NineSliceSprite({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(plane9)
  if (parent) {
    parent.addChild(plane9)
  }
  return plane9
}
// clipping
