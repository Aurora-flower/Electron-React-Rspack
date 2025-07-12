import { createImageObject } from "@/features/document/mod/image"
import { getPadding } from "@/utils/functions/usually"
import { webLog } from "@/utils/log"

export function getImageDataBounds(imageData: ImageData): BoundsModel | null {
  const pixels = new Uint32Array(imageData.data.buffer) /* 创建 32 位视图 */
  const width = imageData.width
  const height = imageData.height
  let left = width
  let right = 0
  let top = height
  let bottom = 0
  /* 按行处理，同时检查左右边界 */
  for (let y = 0; y < height; y++) {
    let rowHasPixel = false
    const rowStart = y * width
    // const rowEnd = rowStart + width
    /* 从左向右找左边界 */
    for (let x = 0; x < width; x++) {
      if ((pixels[rowStart + x] & 0xff000000) !== 0) {
        if (x < left) left = x
        rowHasPixel = true
        break
      }
    }
    /* 从右向左找右边界 */
    for (let x = width - 1; x >= 0; x--) {
      if ((pixels[rowStart + x] & 0xff000000) !== 0) {
        if (x > right) right = x
        rowHasPixel = true
        break
      }
    }
    /* 更新垂直边界 - 持续更新直到最后有像素的行*/
    if (rowHasPixel) {
      if (y < top) top = y
      bottom = y
    }
  }
  if (left > right || top > bottom) {
    /* 全透明的处理 */
    return null
  }
  return {
    left,
    right,
    top,
    bottom,
    width: right - left + 1,
    height: bottom - top + 1
  }
}

/**
 * 使用 canvas 对图像进行九宫格绘制
 * @param original 图片路径
 * @param slider 基本边距信息
 * @returns
 */
export function nineSliceSprite(
  original: string,
  slider: PaddingModel = getPadding()
): string {
  // TODO: 九宫格绘制 - canvas 分区截图，然后汇成一个图片进行绘制
  createImageObject(original, (image, canvas, context) => {
    webLog("image", "nineSliceSprite", original, slider, image, canvas, context)
  })
  return ""
}
