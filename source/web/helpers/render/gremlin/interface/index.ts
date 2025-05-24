import type { Container } from "pixi.js"

export interface PointModel {
  x: number
  y: number
}

export interface SizeModel {
  width: number
  height: number
}

export interface MovePoint {
  from: PointModel
  to: PointModel
}

export type LinePoint = MovePoint

export type ContainerParent = Container | undefined
