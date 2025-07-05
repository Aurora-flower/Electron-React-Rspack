import type { Container } from "pixi.js"

export type ContainerParent = Container | undefined

export interface ConfigModel {
  isNormalAppend?: boolean
  zIndex?: number
}
