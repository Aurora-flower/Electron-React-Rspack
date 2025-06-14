import { TargetDrag } from "@/helpers/graphics/gremlin/event/drag"
import { appendChild } from "@/helpers/graphics/gremlin/functions/append"
import type { Container, HTMLTextOptions } from "pixi.js"
import { HTMLText } from "pixi.js"

export function createRichText(
  parent: Container | undefined = undefined,
  options: HTMLTextOptions = {},
  _config = {},
  isTopIndex = false
): HTMLText {
  const richText = new HTMLText({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(richText)
  appendChild(parent, richText, isTopIndex)
  return richText
}
