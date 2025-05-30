import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import type { Container, SpriteOptions } from "pixi.js"
import { Sprite, Texture } from "pixi.js"

export function createSprite(
  parent: Container | undefined = undefined,
  options: SpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {}
): Sprite {
  const sprite = new Sprite({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(sprite)
  if (parent) {
    parent.addChild(sprite)
  }
  return sprite
}
