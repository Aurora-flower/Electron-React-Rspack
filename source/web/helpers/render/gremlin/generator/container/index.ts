import { Container } from "pixi.js"

export function createContainer(parent?: Container): Container {
  const container = new Container({
    eventMode: "static",
    interactive: true
  })
  if (parent) {
    parent.addChild(container)
  }
  return container
}
