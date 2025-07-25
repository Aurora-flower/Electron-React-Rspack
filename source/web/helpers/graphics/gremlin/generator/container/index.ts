import type { ContainerOptions } from "pixi.js"
import { Container } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

export function createContainer(
  options: ContainerOptions = {},
  parent?: Container
  // config: ConfigModel
): Container {
  const container = new Container({
    // TODO: Container 默认值的设置
    ...options
  })
  if (parent) {
    viewAppend(parent, container)
  }
  return container
}
