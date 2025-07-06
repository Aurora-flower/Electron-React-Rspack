import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { Container, TextOptions } from "pixi.js"
import { Text } from "pixi.js"

export function createText(
  parent: Container,
  options: TextOptions = {},
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): Text {
  const text = new Text({
    ...options
  })
  viewAppend(parent, [text], config)
  return text
}
