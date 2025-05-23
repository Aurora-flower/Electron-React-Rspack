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
      width: 300,
      height: 300
      // tint: 0x036fc2
    })
    // const spriteMeta = {
    //   naturalWidth: texture.width,
    //   naturalHeight: texture.height,
    //   width: sprite.width,
    //   height: sprite.height
    // }
    // sprite.texture = await Assets.load(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`)
    // texture.update();
    const mask = new Graphics()
    const imageData = new Image()
    imageData.crossOrigin = "Anonymous" // This ensures CORS headers are requested
    imageData.src = "https://pixijs.com/assets/eggHead.png"
    imageData.onload = (): void => {
      const imageDataCanvas = document.createElement("canvas")
      imageDataCanvas.width = 300
      imageDataCanvas.height = 300
      const width = imageDataCanvas.width
      const height = imageDataCanvas.height
      const context = imageDataCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D
      context.drawImage(imageData, 0, 0)
      const pixelData = context.getImageData(0, 0, width, height)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4
          const alpha = pixelData.data[index + 3] // 获取透明度值
          if (alpha > 0) {
            mask.rect(x, y, 1, 1).fill(0xffffff) // 只绘制非透明的像素
            webLog(
              "debug",
              "mask",
              width,
              height,
              imageDataCanvas.width,
              imageDataCanvas.height,
              x,
              y,
              alpha
            )
          }
        }
      }
      sprite.mask = mask
      layerContainer.addChild(mask)
    }

    // webLog("debug", "debugPixiRender", spriteMeta, pixelData)

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
