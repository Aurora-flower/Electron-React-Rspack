/**
 * @summary 根据传入的尺寸获取一组矩阵信息
 */

import { getPoint, getSize, getSpace } from "@/common/frequently-used/usually"

interface MatrixModel {
  x: number
  y: number
  width: number
  height: number
  row?: number
  column?: number
  hand?: boolean
}

export function getMatrixItem(
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  row?: number,
  column?: number,
  hand?: boolean
): MatrixModel {
  return {
    x,
    y,
    width,
    height,
    row,
    column,
    hand
  }
}

export function calculateMatrixCoordinates(
  size: SizeModel = getSize(100, 100),
  space: SpaceModel = getSpace(),
  interval = getPoint(50, 50)
  // padding = getPadding(),
): MatrixModel[] {
  const Space = space ?? getSpace()
  // const Padding = padding ?? getPadding()
  let row = 0
  let column = 0
  const matrix = []
  const base = {
    x: Space.horizontal + interval.x,
    y: Space.vertical + interval.y
  }
  // const paddingX = (Padding.left + Padding.right)
  // const paddingY = (Padding.top + Padding.bottom)
  for (let y = 0; y + base.y <= size.height; y += base.y) {
    column += 1
    for (let x = 0; x + base.x <= size.width; x += base.x) {
      row += 1
      const item = getMatrixItem(
        x + Space.horizontal,
        y + Space.vertical,
        interval.x,
        interval.y,
        row,
        column
      )
      // const ox = x + base.x
      // const oy = y + base.y
      // const width = interval.x - paddingX
      // const height = interval.y - paddingY
      // const inner = {
      //   x: ox,
      //   y: oy,
      //   width: paddingX > width ? 0 : width,
      //   height: paddingY > height ? 0 : height
      // }
      // item.inner = inner
      matrix.push(item)
    }
  }
  return matrix
}
