import { Container, type ContainerOptions } from "pixi.js"

export function createContainer(
  options: ContainerOptions,
  _config = {},
  parent?: Container
): Container {
  const container = new Container(options)
  if (parent) {
    parent.addChild(container)
  }
  return container
}
