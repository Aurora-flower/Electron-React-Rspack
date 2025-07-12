import { roundToDecimal } from "@/utils/functions/math"

export function getSize(width = 0, height = 0, digits = 2): SizeModel {
  // arguments
  return {
    width: roundToDecimal(width ?? 0, digits),
    height: roundToDecimal(height ?? 0, digits)
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
    x: roundToDecimal(x ?? 0, digits),
    y: roundToDecimal(y ?? 0, digits)
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
    left: roundToDecimal(left ?? 0, digits),
    right: roundToDecimal(right ?? 0, digits),
    top: roundToDecimal(top ?? 0, digits),
    bottom: roundToDecimal(bottom ?? 0, digits)
  }
}

export function getMovePoint(from: PointModel, to: PointModel): MovePointModel {
  return {
    from,
    to
  }
}
