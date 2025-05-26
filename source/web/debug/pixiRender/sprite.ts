import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import StoreManager from "@/stores/manager"
import { getRandomColor } from "@/utils/functions/color"
import { webError, webLog } from "@/utils/log"
import type { Graphics, Sprite, Texture } from "pixi.js"

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
  const information = StoreManager.getAppInfo()
  if (!information) {
    webError("debugPixiSprite", "error", "AppInfo is null")
    return
  }
  const localURL = `local://${information.core}/resources/images/sample.png`
  const frameURL = `local://${information.core}/resources/images/frame.png`
  const textureURL = "https://pixijs.com/assets/eggHead.png"

  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return

  /* 2. 图片的加载与显示 - local 本地资源协议测试 */
  loadTexture(localURL).then((texture: Texture) => {
    if (!texture) return
    /* 3. 图片的裁剪透明 */
    texture.autoCrop().then((cropTexture: Texture) => {
      const sprite = createSprite(layerContainer, {
        texture: cropTexture,
        position: {
          x: 300,
          y: 300
        }
      })
      const rect = createGraphics(layerContainer, {
        alpha: 0.3
      })
      rect
        .rect(
          sprite.position.x - cropTexture.frame.left,
          sprite.position.y - cropTexture.frame.top,
          texture.width,
          texture.height
        )
        .fill(getRandomColor())
      rect
        .rect(sprite.position.x, sprite.position.y, sprite.width, sprite.height)
        .fill(getRandomColor())
      webLog(
        "autoCrop",
        "cropTexture",
        cropTexture.width,
        cropTexture.height,
        layerContainer
      )
    })
  })

  let sprite1: Sprite
  let rect1: Graphics

  loadTexture(frameURL).then(texture => {
    if (!texture) return
    /* 5. 图片的切换 */
    sprite1 = createSprite(layerContainer, {
      texture,
      position: {
        x: 100,
        y: 100
      },
      scale: {
        x: 0.5,
        y: 0.5
      }
    })
    rect1 = createGraphics(layerContainer, {
      alpha: 0.3,
      position: {
        x: sprite1.position.x,
        y: sprite1.position.y
      }
    })
    rect1.rect(0, 0, sprite1.width, sprite1.height).fill(getRandomColor())
    layerContainer.addChild(rect1)
  })

  loadTexture(textureURL).then((texture1: Texture) => {
    /* 4. 创建九宫格模式精灵对象 */
    createNineSliceSprite(layerContainer, {
      texture: texture1,
      width: 300,
      height: 300,
      leftWidth: 80,
      rightWidth: 80,
      topHeight: 80,
      bottomHeight: 80,
      x: 400,
      y: 0
    })
    setTimeout(() => {
      sprite1.texture = texture1
      // rect1.position.set(sprite1.position.x, sprite1.position.y)
      rect1.setSize(sprite1.width, sprite1.height)
    }, 1000 * 3)
  })
}
