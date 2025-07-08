import type { Container, TextOptions } from "pixi.js"
import { Text } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

export function createText(
  parent: Container | undefined = undefined,
  options: TextOptions = {},
  config = {
    isNormalAppend: true,
    zIndex: 0
  }
): Text {
  const text = new Text({
    // TODO: Text 默认值的设置
    ...options
  })
  if (parent) {
    viewAppend(parent, [text], config)
  }
  return text
}
