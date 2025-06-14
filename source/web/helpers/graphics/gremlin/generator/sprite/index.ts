import { TargetDrag } from "@/helpers/graphics/gremlin/event/drag"
import { appendChild } from "@/helpers/graphics/gremlin/functions/append"
import type { Container, SpriteOptions } from "pixi.js"
import { Sprite, Texture } from "pixi.js"

export function createSprite(
  parent: Container | undefined = undefined,
  options: SpriteOptions = {
    texture: Texture.EMPTY
  },
  _config = {},
  isTopIndex = false
): Sprite {
  const sprite = new Sprite({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(sprite)
  appendChild(parent, sprite, isTopIndex)
  return sprite
}
