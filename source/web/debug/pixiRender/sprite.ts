import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import { calculateMatrixCoordinates } from "@/logic/algorithm/matrix"
import StoreManager from "@/stores/manager"
import { replaceNormalize } from "@/utils/features/url"
import { getRandomColor } from "@/utils/functions/color"
import { webError, webLog } from "@/utils/log"
import { FancyButton } from "@pixi/ui"
import type { Graphics, Sprite } from "pixi.js"
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
  const information = StoreManager.getAppInfo()
  if (!information) {
    webError("debugPixiSprite", "error", "AppInfo is null")
    return
  }

  calculateMatrixCoordinates()

  /* 测试文件 - 图片资源 */
  const localURL = replaceNormalize(
    `local://${information.core}/resources/images/sample.png`
  )
  const frameURL = replaceNormalize(
    `local://${information.core}/resources/images/frame.png`
  )
  const textureURL = "https://pixijs.com/assets/eggHead.png"
  // const bunnyURL = 'https://pixijs.com/assets/bunny.png'
  // 'https://pixijs.com/assets/flowerTop.png'

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
      y: 0,
      scale: {
        x: 0.5,
        y: 0.5
      }
    })
    setTimeout(() => {
      sprite1.texture = texture1
      // rect1.position.set(sprite1.position.x, sprite1.position.y)
      rect1.setSize(sprite1.width, sprite1.height)
    }, 1000 * 3)

    // const button = new Button(
    //   new Graphics({
    //     position: {
    //       x: 50,
    //       y: 50
    //     }
    //   })
    //     .rect(0, 0, 100, 50)
    //     .fill(0xffffff)
    // )

    // button.onPress.connect(() => console.log("onPress"))

    // const input = new Input({
    //   bg: texture1,
    //   placeholder: "Enter text",
    //   padding: {
    //     top: 11,
    //     right: 11,
    //     bottom: 11,
    //     left: 11
    //   } // alternatively you can use [11, 11, 11, 11] or [11, 11] or just 11
    // })
    // input.position.x = 50
    // input.position.y = 200

    // const slider = new Slider({
    //   bg: texture1,
    //   fill: texture1,
    //   slider: sprite1,
    //   min: 0,
    //   max: 100,
    //   value: 50
    // })

    // slider.onChange.connect(value => {
    //   console.log(`Slider changed to ${value}`)
    // })

    // slider.position.x = 300

    // const progressBar = new ProgressBar({
    //   bg: texture1,
    //   fill: texture1,
    //   progress: 50,
    //   fillPaddings: {
    //     top: 100,
    //     right: 100,
    //     bottom: 100,
    //     left: 100
    //   }
    // })
    // progressBar.position.x = 500
    // progressBar.position.y = 100

    // const scrollbox = new ScrollBox({
    //   background: 0xffffff,
    //   width: 200,
    //   height: 300,
    //   items: [
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
    //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor())
    //   ]
    // })

    // const radioGroup = new RadioGroup({
    //   items: [
    //     new CheckBox({
    //       style: {
    //         unchecked: texture1,
    //         checked: texture1
    //       }
    //     }),
    //     new CheckBox({
    //       style: {
    //         unchecked: texture1,
    //         checked: texture1
    //       }
    //     }),
    //     new CheckBox({
    //       style: {
    //         unchecked: texture1,
    //         checked: texture1
    //       }
    //     })
    //   ],
    //   elementsMargin: 10,
    //   type: "vertical"
    // })

    // const checkBox = new CheckBox({
    //   style: {
    //     unchecked: texture1,
    //     checked: texture1
    //   }
    // })

    const fancyButton = new FancyButton({
      defaultView: texture1,
      hoverView: texture1,
      pressedView: texture1,
      text: "Click me!",
      animations: {
        hover: {
          props: {
            scale: {
              x: 1.1,
              y: 1.1
            }
          },
          duration: 100
        },
        pressed: {
          props: {
            scale: {
              x: 0.9,
              y: 0.9
            }
          },
          duration: 100
        }
      }
    })

    fancyButton.onPress.connect(() => console.log("Button pressed!"))

    layerContainer.addChild(fancyButton)
  })
}
