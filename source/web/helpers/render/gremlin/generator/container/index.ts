import type { ContainerOptions } from "pixi.js"
import { Container } from "pixi.js"

export function createContainer(
  parent: Container | undefined = undefined,
  options: ContainerOptions = {},
  _config = {}
): Container {
  const container = new Container({
    interactive: true,
    eventMode: "static",
    ...options
  })
  if (parent) {
    parent.addChild(container)
  }
  return container
}
