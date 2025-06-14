import { appendChild } from "@/helpers/graphics/gremlin/functions/append"
import type { ContainerOptions } from "pixi.js"
import { Container } from "pixi.js"

export function createContainer(
  parent: Container | undefined = undefined,
  options: ContainerOptions = {},
  _config = {},
  isTopIndex = false
): Container {
  const container = new Container({
    interactive: true,
    eventMode: "static",
    ...options
  })
  appendChild(parent, container, isTopIndex)
  return container
}
