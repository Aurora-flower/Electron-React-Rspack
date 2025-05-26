import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import StoreManager from "@/stores/manager"
import { replaceNormalize } from "@/utils/features/url"
import { getRandomColor } from "@/utils/functions/color"
import { webError, webLog } from "@/utils/log"
import { FancyButton } from "@pixi/ui"
import type { Container } from "pixi.js"
import type { Texture } from "pixi.js"

// const sprite = createSprite(layerContainer, {
//   texture,
//   position: {
//     x: 100,
//     y: 100
//   }
// })

/**
 * @summary local 本地资源协议测试 - pixi 图片的加载与显示 | 图片透明区的裁切 | 混合色效果
 * @returns
 */
function debugLocalTexture(container: Container, textureURL: string): void {
  loadTexture(textureURL).then((texture: Texture) => {
    if (!texture) return
    /* 图片的裁剪透明 */
    texture.autoCrop().then((cropTexture: Texture) => {
      const sprite = createSprite(container, {
        texture: cropTexture,
        position: {
          x: 300,
          y: 300
        },
        tint: 0x036fc2 /* 混合色效果 */
      })
      const rect = createGraphics(container, {
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
        container
      )
    })
  })
}

function debugSiwtchSprite(container: Container, textureURL: string): void {
  const bunnyURL = "https://pixijs.com/assets/bunny.png"
  loadTexture(textureURL).then(texture => {
    if (!texture) return
    /* 5. 图片的切换 */
    const sprite = createSprite(container, {
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
    const graphic = createGraphics(container, {
      alpha: 0.3,
      position: {
        x: sprite.position.x,
        y: sprite.position.y
      }
    })
    graphic.rect(0, 0, sprite.width, sprite.height).fill(getRandomColor())

    loadTexture(bunnyURL).then((bunny: Texture) => {
      sprite.texture = bunny
      graphic.setSize(sprite.width, sprite.height)
    })
  })
}

function debugNineSliceSprite(container: Container, textureURL: string): void {
  loadTexture(textureURL).then((texture: Texture) => {
    /* 4. 创建九宫格模式精灵对象 */
    createNineSliceSprite(container, {
      texture,
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
  })
}

function debugPixiSprite(): void {
  const information = StoreManager.getAppInfo()
  if (!information) {
    webError("debugPixiSprite", "error", "AppInfo is null")
    return
  }
  const sampleURL = replaceNormalize(
    `local://${information.core}/resources/images/sample.png`
  )
  const frameURL = replaceNormalize(
    `local://${information.core}/resources/images/frame.png`
  )
  const eggHeadURL = "https://pixijs.com/assets/eggHead.png"
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  // const spriteURL = "https://imgur.com/T2vjvYl.png"
  const app = PixiManager.getApp()
  const layerContainer = getElementByLabel("layer", app.stage)
  if (!layerContainer) return

  debugLocalTexture(layerContainer, sampleURL)
  debugSiwtchSprite(layerContainer, frameURL)
  debugNineSliceSprite(layerContainer, eggHeadURL)
  loadTexture(flowerTopURL).then((texture: Texture) => {
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
    //   bg: texture,
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
    //   bg: texture,
    //   fill: texture,
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
    //   bg: texture,
    //   fill: texture,
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
    //         unchecked: texture,
    //         checked: texture
    //       }
    //     }),
    //     new CheckBox({
    //       style: {
    //         unchecked: texture,
    //         checked: texture
    //       }
    //     }),
    //     new CheckBox({
    //       style: {
    //         unchecked: texture,
    //         checked: texture
    //       }
    //     })
    //   ],
    //   elementsMargin: 10,
    //   type: "vertical"
    // })

    // const checkBox = new CheckBox({
    //   style: {
    //     unchecked: texture,
    //     checked: texture
    //   }
    // })
    const fancyButton = new FancyButton({
      defaultView: texture,
      hoverView: texture,
      pressedView: texture,
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

export default debugPixiSprite
