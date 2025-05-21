import { type Container, Text, type TextOptions } from "pixi.js"

export function createText(
  parent: Container | undefined = undefined,
  options: TextOptions = {},
  _config = {}
): Text {
  const text = new Text(options)
  if (parent) {
    parent.addChild(text)
  }
  return text
}
