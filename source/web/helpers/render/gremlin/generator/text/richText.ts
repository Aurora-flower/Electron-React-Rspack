import type { Container, HTMLTextOptions } from "pixi.js"
import { HTMLText } from "pixi.js"

export function createRichText(
  parent: Container | undefined = undefined,
  options: HTMLTextOptions = {},
  _config = {}
): HTMLText {
  const text = new HTMLText({
    interactive: true,
    eventMode: "static",
    ...options
  })
  if (parent) {
    parent.addChild(text)
  }
  return text
}
