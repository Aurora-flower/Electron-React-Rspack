import { TargetDrag } from "@/helpers/render/gremlin/event/drag"
import { appendChild } from "@/helpers/render/gremlin/functions/append"
import type { Container, TextOptions } from "pixi.js"
import { Text } from "pixi.js"

export function createText(
  parent: Container | undefined = undefined,
  options: TextOptions = {},
  _config = {},
  isTopIndex = false
): Text {
  const text = new Text({
    interactive: true,
    eventMode: "static",
    ...options
  })
  TargetDrag.markTarget(text)
  appendChild(parent, text, isTopIndex)
  return text
}
