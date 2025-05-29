import type { Container, TextOptions } from "pixi.js"
import { Text } from "pixi.js"

export function createText(
  parent: Container | undefined = undefined,
  options: TextOptions = {},
  _config = {}
): Text {
  const text = new Text({
    interactive: true,
    eventMode: "static",
    ...options
  })
  if (parent) {
    parent.addChild(text)
  }
  return text
}
