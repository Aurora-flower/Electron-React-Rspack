import type { ContainerOptions } from "pixi.js"
import { Container } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import type { ConfigModel } from "@/helpers/graphics/gremlin/interface"

export function createContainer(
  parent: Container | undefined = undefined,
  options: ContainerOptions = {},
  config: ConfigModel = {
    isNormalAppend: true,
    zIndex: 0
  }
): Container {
  const container = new Container({
    // TODO: Container 默认值的设置
    ...options
  })
  if (parent) {
    viewAppend(parent, [container], config)
  }
  return container
}
