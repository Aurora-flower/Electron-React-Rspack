import type { Container, HTMLTextOptions } from "pixi.js"
import { HTMLText } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

export function createHTMLText(
  parent: Container | undefined = undefined,
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
  if (parent) {
    viewAppend(parent, richText, config)
  }
  return richText
}
