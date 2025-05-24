import { byLabelFindElement } from "@/helpers/render/gremlin/functions/find"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import { webLog } from "@/utils/log"
import { Graphics, type Texture } from "pixi.js"

export function debugPixiSprite(): void {
  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = byLabelFindElement("layer", app.stage)
  if (!layerContainer) return

  /* 2. 图片的加载与显示 - local 本地资源协议测试 */
  loadTexture(
    // `local://${join("core/resources/images/sample.png")}`
    "https://pixijs.com/assets/eggHead.png"
  ).then((texture: Texture) => {
    /* 创建普通精灵对象 */
    const sprite = createSprite(layerContainer, {
      texture,
      position: {
        x: 100,
        y: 100
      }
      // tint: 0x036fc2
    })
    const spriteMeta = {
      naturalWidth: texture.width,
      naturalHeight: texture.height,
      width: sprite.width,
      height: sprite.height
    }
    // sprite.texture = await Assets.load(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`)
    // texture.update();
    let imageData: ImageData
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d") as CanvasRenderingContext2D
    const image = new Image()
    image.crossOrigin = "Anonymous"
    image.src = texture.label || ""
    image.onload = (): void => {
      // 在画布上使用图片的实际尺寸（以 CSS 像素为单位）
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      context.drawImage(image, 0, 0)
      // const dataURL = canvas.toDataURL("image/png")
      imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const mask = new Graphics({
        position: {
          x: 100,
          y: 100
        }
      })
      const pixelData = imageData.data
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
      const u32Buffer = new Uint32Array(pixelData.buffer) // 创建32位视图
      const width = canvas.width
      const height = canvas.height
      for (let y = 0; y < height; y++) {
        const rowStart = y * width // 行起始索引
        for (let x = 0; x < width; x++) {
          const rgba = u32Buffer[rowStart + x] // 一次性读取32位RGBA值
          const alpha = (rgba >>> 24) & 0xff // 提取alpha通道
          if (alpha > 0) {
            mask.rect(x, y, 1, 1).fill(0xffffff)
          }
        }
      }
      sprite.mask = mask
      layerContainer.addChild(mask)
      // context.drawImage(image, 0, 0, image.width, image.height)
      webLog("debug", "debugPixiRender", spriteMeta, pixelData, texture)
    }

    /* 创建九宫格模式精灵对象 */
    const nineSprite = createNineSliceSprite(layerContainer, {
      texture,
      width: 300,
      height: 300,
      leftWidth: 80,
      rightWidth: 80,
      topHeight: 80,
      bottomHeight: 80
    })
    nineSprite.position.set(300, 300)
  })
}
