import type { Container } from "pixi.js"

export interface PointModel {
  x: number
  y: number
}

export interface SizeModel {
  width: number
  height: number
}

export type ContainerParent = Container | undefined
