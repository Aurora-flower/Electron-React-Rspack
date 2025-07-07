import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { Container, HTMLTextOptions } from "pixi.js"
import { HTMLText } from "pixi.js"

export function createText(
  parent: Container,
  options: HTMLTextOptions = {},
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): HTMLText {
  const richText = new HTMLText({
    // TODO: HTMLText 默认值的设置
    ...options
  })
  viewAppend(parent, [richText], config)
  return richText
}
