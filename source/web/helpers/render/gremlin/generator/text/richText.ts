import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import type { Container, HTMLTextOptions } from "pixi.js"
import { HTMLText } from "pixi.js"

export function createRichText(
  parent: Container | undefined = undefined,
  options: HTMLTextOptions = {},
  _config = {}
): HTMLText {
  const richText = new HTMLText({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(richText)
  if (parent) {
    parent.addChild(richText)
  }
  return richText
}
