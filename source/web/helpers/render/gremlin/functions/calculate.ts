// const pixel = 0xffffffff
// const red = (pixel & 0x00ff0000) >>> 16;
// const green = (pixel & 0x0000ff00) >>> 8;
// const blue = pixel & 0x000000ff;
// const alpha = (pixel & 0xff000000) >>> 24;
// console.log(red, green, blue, alpha)

// const stride = canvas.width * 4 // 每行占用的数组长度，RGBA四通道存储为一组
// for (let y = 0; y < canvas.height; y++) {
//   const rowStart = y * stride // 预计算行偏移量
//   for (let x = 0; x < canvas.width; x++) {
//     const index = rowStart + x * 4 // 计算当前像素位置
//     const alpha = pixelData[index + 3] // 获取alpha通道
//     if (alpha > 0) {
//       mask.rect(x, y, 1, 1).fill(0xffffff)
//     }
//   }
// }

// for (let index = 0; index < pixelData.length; index++) {
//   const pixel = pixelData[index]
//   if (pixel > 0) {
//     mask.rect()
//   }
// }
// for (let y = 0; y < canvas.height; y++) {
//   for (let x = 0; x < canvas.width; x++) {
//     const index = (y * canvas.width + x) * 4
//     const alpha = pixelData[index + 3]
//     if (alpha > 0) {
//       mask.rect(x, y, 1, 1).fill(0xffffff)
//     }
//   }
// }

export function calculateImageBounds(imageData: ImageData): BoundsModel | null {
  const pixels = new Uint32Array(imageData.data.buffer)
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
