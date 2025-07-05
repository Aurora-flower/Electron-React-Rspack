import { formatNumberPrecision } from "@/utils/functions/math"

export function getSize(
  this: AnyModel,
  width = 0,
  height = 0,
  digits = 2
): SizeModel {
  console.log(this?.arguments)
  return {
    width: formatNumberPrecision(width ?? 0, digits),
    height: formatNumberPrecision(height ?? 0, digits)
  }
}

export function getSpace(horizontal = 0, vertical = 0): SpaceModel {
  return {
    horizontal,
    vertical
  }
}

export function getPoint(x = 0, y = 0, digits = 2): PointModel {
  return {
    x: formatNumberPrecision(x ?? 0, digits),
    y: formatNumberPrecision(y ?? 0, digits)
  }
}

export function getPadding(
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  digits = 2
): PaddingModel {
  return {
    left: formatNumberPrecision(left ?? 0, digits),
    right: formatNumberPrecision(right ?? 0, digits),
    top: formatNumberPrecision(top ?? 0, digits),
    bottom: formatNumberPrecision(bottom ?? 0, digits)
  }
}

export function getMovePoint(from: PointModel, to: PointModel): MovePointModel {
  return {
    from,
    to
  }
}
