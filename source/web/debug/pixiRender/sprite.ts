import { findContentBounds } from "@/helpers/render/gremlin/functions/calculate"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import { join } from "@/utils/inputs/url"
import { webLog } from "@/utils/log"
import { Graphics, type Texture } from "pixi.js"

// const sprite = createSprite(layerContainer, {
//   texture,
//   position: {
//     x: 100,
//     y: 100
//   }
//   // tint: 0x036fc2
// })
// const spriteMeta = {
//   naturalWidth: texture.width,
//   naturalHeight: texture.height,
//   width: sprite.width,
//   height: sprite.height
// }

// const mask = new Graphics({
//   position: {
//     x: 100,
//     y: 100
//   }
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

export function debugPixiSprite(): void {
  const localURL = `local://${join("core/resources/images/sample.png")}`
  // const remoteURL = `remote://${join("core/resources/images/sample.png")}`
  // const textureURL = "https://pixijs.com/assets/eggHead.png"

  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return

  loadTexture(localURL)

    /* 2. 图片的加载与显示 - local 本地资源协议测试 */
    // loadTexture(textureURL)
    .then((texture: Texture) => {
      const width = texture.width
      const height = texture.height
      let imageData: ImageData
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d") as CanvasRenderingContext2D
      const image = new Image()
      image.crossOrigin = "Anonymous"
      image.src = texture.label || ""
      image.onload = (): void => {
        // 在画布上使用图片的实际尺寸（以 CSS 像素为单位）
        canvas.width = width //image.naturalWidth
        canvas.height = height //image.naturalHeight
        context.drawImage(image, 0, 0)
        imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const bounds = findContentBounds(imageData)
        if (!bounds) return
        context.clearRect(0, 0, width, height)
        context.drawImage(
          image,
          bounds?.left ?? 0,
          bounds?.top ?? 0,
          bounds.width,
          bounds.height,
          0,
          0,
          width,
          height
        )
        const dataURL = canvas.toDataURL("image/png")
        loadTexture(dataURL).then(texture => {
          createSprite(layerContainer, {
            texture,
            position: {
              x: 100,
              y: 100
            },
            width: bounds.width,
            height: bounds.height
          })
          const boundGraphics = new Graphics({
            alpha: 0.5,
            position: {
              x: 100,
              y: 100
            }
          })
          boundGraphics.rect(0, 0, bounds.width, bounds.height).fill(0xffffff)
          boundGraphics
            .rect(-(bounds?.left ?? 0), -(bounds?.top ?? 0), width, height)
            .fill(0xe54073)
          layerContainer.addChild(boundGraphics)
        })
        webLog("debug", "debugPixiRender", texture, bounds)
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

      // sprite.texture = await Assets.load(`local://xxxx}`)
      // texture.update();
    })
}
