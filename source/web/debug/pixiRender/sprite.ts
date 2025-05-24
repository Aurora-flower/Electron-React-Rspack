import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import { join } from "@/utils/inputs/url"
import { webLog } from "@/utils/log"
import type { Texture } from "pixi.js"

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
  const textureURL = "https://pixijs.com/assets/eggHead.png"

  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return

  loadTexture(localURL)

    /* 2. 图片的加载与显示 - local 本地资源协议测试 */
    // loadTexture(textureURL)
    .then((texture: Texture) => {
      /* 3. 图片的裁剪透明 */
      texture.autoCrop().then((cropTexture: Texture) => {
        createSprite(layerContainer, {
          texture: cropTexture
        })
        webLog("autoCrop", "cropTexture", cropTexture.width, cropTexture.height)
      })

      /* 5. 图片的切换 */
      const sprite = createSprite(layerContainer, {
        texture,
        position: {
          x: 100,
          y: 0
        },
        scale: {
          x: 0.5,
          y: 0.5
        }
      })
      loadTexture(textureURL).then((texture1: Texture) => {
        setTimeout(() => {
          sprite.texture = texture1
        }, 1000 * 3)
      })

      /* 4. 创建九宫格模式精灵对象 */
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
