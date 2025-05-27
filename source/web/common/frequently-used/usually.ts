import { formatNumberPrecision } from "@/utils/modules/digits"

export function getSize(width = 0, height = 0): SizeModel {
  return {
    width: formatNumberPrecision(width ?? 0, 2),
    height: formatNumberPrecision(height ?? 0)
  }
}

export function getSpace(horizontal = 0, vertical = 0): SpaceModel {
  return {
    horizontal,
    vertical
  }
}

export function getPoint(x = 0, y = 0): PointModel {
  return {
    x,
    y
  }
}

export function getPadding(
  left = 0,
  right = 0,
  top = 0,
  bottom = 0
): PaddingModel {
  return {
    left,
    right,
    top,
    bottom
  }
}

export function getMovePoint(
  from: PointModel = getPoint(),
  to: PointModel = getPoint()
): MovePointModel {
  return {
    from,
    to
  }
}
