import { byLabelFindElement } from "@/helpers/render/gremlin/functions/find"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import { join } from "@/utils/inputs/url"
import { webLog } from "@/utils/log"
import { Graphics, type Texture } from "pixi.js"

// Texture.prototype.autoCrop = async function(): Promise<Texture> {
//     const image = await this.baseTexture.resource.source
//     const bounds = await calculateImageBounds(image)
//     return new Texture(this.baseTexture, new Rectangle(
//         bounds.left,
//         bounds.top,
//         bounds.width,
//         bounds.height
//     ))
// }

interface Bounds {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

function findContentBounds(imageData: ImageData): Bounds | null {
  const pixels = new Uint32Array(imageData.data.buffer)
  const width = imageData.width
  const height = imageData.height

  // 初始化边界值
  let left = width
  let right = 0
  let top = height
  let bottom = 0

  // 优化遍历：按行处理，同时检查左右边界
  for (let y = 0; y < height; y++) {
    let rowHasPixel = false
    const rowStart = y * width

    // 从左向右找左边界
    for (let x = 0; x < width; x++) {
      if ((pixels[rowStart + x] & 0xff000000) !== 0) {
        if (x < left) left = x
        rowHasPixel = true
        break
      }
    }

    // 从右向左找右边界
    for (let x = width - 1; x >= 0; x--) {
      if ((pixels[rowStart + x] & 0xff000000) !== 0) {
        if (x > right) right = x
        rowHasPixel = true
        break
      }
    }

    // 更新垂直边界
    if (rowHasPixel) {
      if (y < top) top = y
      bottom = y // 持续更新直到最后有像素的行
    }
  }

  // 处理全透明情况
  if (left > right || top > bottom) return null

  return {
    left,
    right,
    top,
    bottom,
    width: right - left + 1,
    height: bottom - top + 1
  }
}

export function debugPixiSprite(): void {
  const localURL = `local://${join("core/resources/images/sample.png")}`
  // const remoteURL = `remote://${join("core/resources/images/sample.png")}`
  // const textureURL = "https://pixijs.com/assets/eggHead.png"

  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = byLabelFindElement("layer", app.stage)
  if (!layerContainer) return

  loadTexture(localURL)

    /* 2. 图片的加载与显示 - local 本地资源协议测试 */
    // loadTexture(textureURL)
    .then((texture: Texture) => {
      /* 创建普通精灵对象 */
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
      // sprite.texture = await Assets.load(`local://xxxx}`)
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
        // sprite.mask = mask
        // layerContainer.addChild(mask)
        context.clearRect(0, 0, width, height)
        const bound = findContentBounds(imageData)
        context.drawImage(
          image,
          bound?.left ?? 0,
          bound?.top ?? 0,
          mask.width,
          mask.height,
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
            width: mask.width,
            height: mask.height
          })
          const boundGraphics = new Graphics({
            alpha: 0.5,
            position: {
              x: 100,
              y: 100
            }
          })
          boundGraphics.rect(0, 0, mask.width, mask.height).fill(0xffffff)
          boundGraphics
            .rect(-(bound?.left ?? 0), -(bound?.top ?? 0), width, height)
            .fill(0xe54073)
          layerContainer.addChild(boundGraphics)
        })
        webLog(
          "debug",
          "debugPixiRender",
          // spriteMeta,
          pixelData,
          texture,
          mask.width,
          mask.height,
          mask.position,
          bound
        )
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
