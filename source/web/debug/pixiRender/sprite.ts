import PixiManager from "@/helpers/render/gremlin"
import { nineSliceSprite } from "@/helpers/render/gremlin/functions/compute/image"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createGraphics } from "@/helpers/render/gremlin/generator/graphics"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import StoreManager from "@/stores/manager"
import { replaceNormalize } from "@/utils/features/url"
import { getRandomColor } from "@/utils/functions/color"
import { webLog, webWarn } from "@/utils/log"
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
 */
export function debugLocalTexture(
  container: Container,
  textureURL: string
): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: {
      x: matrixItem.x,
      y: matrixItem.y
    }
  })
  loadTexture(textureURL).then((texture: Texture) => {
    if (!texture) return
    /* 1. 图片的裁剪透明 */
    texture.autoCrop().then((cropTexture: Texture) => {
      const sprite = createSprite(child, {
        texture: cropTexture,
        /* 2. 混合色效果 */
        tint: 0x036fc2
        /* 3. 锚点的影响行为 */
        // anchor: {
        //   x: 0.5,
        //   y: -0.5
        // }
        /* 4. 对裁切图设置尺寸的影响 */
        // width: matrixItem.width,
        // height: matrixItem.height
        /* 6. 图片缩放 */
        // scale: {
        //   x: 0.5,
        //   y: 0.5
        // },
      })
      const rect = createGraphics(child, {
        alpha: 0.2
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
    })
  })
  matrixItem.able = false
}

/**
 * @summary 切换图片
 * @remarks
 * - 切换 sprite 的 texture，而不用销毁重新创建
 */
export function debugSwitchSprite(
  container: Container,
  textureURL: string
): void {
  const bunnyURL = "https://pixijs.com/assets/bunny.png"
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: {
      x: matrixItem.x,
      y: matrixItem.y
    }
  })
  loadTexture(textureURL).then(texture => {
    if (!texture) return
    const sprite = createSprite(child, {
      texture,
      width: matrixItem.width,
      height: matrixItem.height
    })
    const graphic = createGraphics(child, {
      alpha: 0.1
    })
    graphic.rect(0, 0, sprite.width, sprite.height).fill(getRandomColor())

    const timeout = 3000
    const timer = setTimeout(() => {
      /* 2. 图片源切换 */
      loadTexture(bunnyURL).then((bunny: Texture) => {
        sprite.texture = bunny
        sprite.setSize(bunny.width, bunny.height)
        graphic.setSize(bunny.width, bunny.height)
        clearTimeout(timer)
      })
    }, timeout)
  })
  matrixItem.able = false
}

/**
 * @summary 九宫格图片的显示(创建九宫格模式精灵对象) - pixi API 的实现方式 | Canvas 的实现方式
 */
export function debugNineSliceSprite(
  container: Container,
  textureURL: string
): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: {
      x: matrixItem.x,
      y: matrixItem.y
    }
  })
  /* 1. 通过 pixi 的 API 创建九宫格模式精灵对象 */
  loadTexture(textureURL).then((texture: Texture) => {
    createNineSliceSprite(child, {
      texture,
      width: matrixItem.width,
      height: matrixItem.height,
      leftWidth: 60,
      rightWidth: 60,
      topHeight: 60,
      bottomHeight: 60
    })
    webLog("sprite", "createNineSliceSprite", texture.width, texture.height)
  })

  /* 2. 借助 Canvas 的 API 创建九宫格模式精灵对象 */
  // const nineSpriteURL =
  nineSliceSprite(textureURL)
  // loadTexture(nineSpriteURL).then((texture: Texture) => {
  //   createSprite(child, {
  //     texture
  //   })
  // })
  matrixItem.able = false
}

function debugPixiSprite(): void {
  const information = StoreManager.getAppInfo()
  if (!information) {
    webWarn("debugPixiSprite", "Warn", "AppInfo is null")
    return
  }

  // const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  // const spriteURL = "https://imgur.com/T2vjvYl.png"
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return

  const sampleURL = replaceNormalize(
    `local://${information.core}/resources/images/sample.png`
  )
  debugLocalTexture(layerContainer, sampleURL)

  const eggHeadURL = "https://pixijs.com/assets/eggHead.png"
  debugNineSliceSprite(layerContainer, eggHeadURL)

  const frameURL = replaceNormalize(
    `local://${information.core}/resources/images/frame.png`
  )
  debugSwitchSprite(layerContainer, frameURL)
  // loadTexture(flowerTopURL).then((texture: Texture) => {
  //   // const button = new Button(
  //   //   new Graphics({
  //   //     position: {
  //   //       x: 50,
  //   //       y: 50
  //   //     }
  //   //   })
  //   //     .rect(0, 0, 100, 50)
  //   //     .fill(0xffffff)
  //   // )

  //   // button.onPress.connect(() => console.log("onPress"))

  //   // const input = new Input({
  //   //   bg: texture,
  //   //   placeholder: "Enter text",
  //   //   padding: {
  //   //     top: 11,
  //   //     right: 11,
  //   //     bottom: 11,
  //   //     left: 11
  //   //   } // alternatively you can use [11, 11, 11, 11] or [11, 11] or just 11
  //   // })
  //   // input.position.x = 50
  //   // input.position.y = 200

  //   // const slider = new Slider({
  //   //   bg: texture,
  //   //   fill: texture,
  //   //   slider: sprite1,
  //   //   min: 0,
  //   //   max: 100,
  //   //   value: 50
  //   // })

  //   // slider.onChange.connect(value => {
  //   //   console.log(`Slider changed to ${value}`)
  //   // })

  //   // slider.position.x = 300

  //   // const progressBar = new ProgressBar({
  //   //   bg: texture,
  //   //   fill: texture,
  //   //   progress: 50,
  //   //   fillPaddings: {
  //   //     top: 100,
  //   //     right: 100,
  //   //     bottom: 100,
  //   //     left: 100
  //   //   }
  //   // })
  //   // progressBar.position.x = 500
  //   // progressBar.position.y = 100

  //   // const scrollbox = new ScrollBox({
  //   //   background: 0xffffff,
  //   //   width: 200,
  //   //   height: 300,
  //   //   items: [
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
  //   //     new Graphics().rect(0, 0, 200, 50).fill(getRandomColor())
  //   //   ]
  //   // })

  //   // const radioGroup = new RadioGroup({
  //   //   items: [
  //   //     new CheckBox({
  //   //       style: {
  //   //         unchecked: texture,
  //   //         checked: texture
  //   //       }
  //   //     }),
  //   //     new CheckBox({
  //   //       style: {
  //   //         unchecked: texture,
  //   //         checked: texture
  //   //       }
  //   //     }),
  //   //     new CheckBox({
  //   //       style: {
  //   //         unchecked: texture,
  //   //         checked: texture
  //   //       }
  //   //     })
  //   //   ],
  //   //   elementsMargin: 10,
  //   //   type: "vertical"
  //   // })

  //   // const checkBox = new CheckBox({
  //   //   style: {
  //   //     unchecked: texture,
  //   //     checked: texture
  //   //   }
  //   // })
  //   const fancyButton = new FancyButton({
  //     defaultView: texture,
  //     hoverView: texture,
  //     pressedView: texture,
  //     text: "Click me!",
  //     animations: {
  //       hover: {
  //         props: {
  //           scale: {
  //             x: 1.1,
  //             y: 1.1
  //           }
  //         },
  //         duration: 100
  //       },
  //       pressed: {
  //         props: {
  //           scale: {
  //             x: 0.9,
  //             y: 0.9
  //           }
  //         },
  //         duration: 100
  //       }
  //     }
  //   })

  //   fancyButton.onPress.connect(() => console.log("Button pressed!"))

  //   layerContainer.addChild(fancyButton)
  // })
}

export default debugPixiSprite
