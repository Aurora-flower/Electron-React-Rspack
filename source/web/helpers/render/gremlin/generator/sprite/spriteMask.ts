/**
 * @summary 根据图片中的内容设置贴合图片大小的遮罩
 */
export function setSpriteFittingMask(): void {
  // const spriteMeta = {
  //   naturalWidth: texture.width,
  //   naturalHeight: texture.height,
  //   width: sprite.width,
  //   height: sprite.height
  // }
  // const mask = new Graphics({
  // })
  // const pixelData = imageData.data
  // const u32Buffer = new Uint32Array(pixelData.buffer) // 创建32位视图
  // const width = canvas.width
  // const height = canvas.height
  // for (let y = 0; y < height; y++) {
  //   const rowStart = y * width // 行起始索引
  //   for (let x = 0; x < width; x++) {
  //     const rgba = u32Buffer[rowStart + x] // 一次性读取32位RGBA值
  //     const alpha = (rgba >>> 24) & 0xff // 提取alpha通道
  //     if (alpha > 0) {
  //       mask.rect(x, y, 1, 1).fill(0xffffff)
  //     }
  //   }
  // }
}
