import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import { appendChild } from "@/helpers/render/gremlin/functions/append"
import type { Container, NineSliceSpriteOptions } from "pixi.js"
import { NineSliceSprite, Texture } from "pixi.js"

export function createNineSliceSprite(
  parent: Container | undefined = undefined,
  options: NineSliceSpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {},
  isTopIndex = false
): Container {
  const plane9 = new NineSliceSprite({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(plane9)
  appendChild(parent, plane9, isTopIndex)
  return plane9
}
// clipping
