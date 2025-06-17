import PixiManager from "@/helpers/graphics/gremlin"
import { loadTexture } from "@/helpers/graphics/gremlin/generator/assets"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"
import { createGraphics } from "@/helpers/graphics/gremlin/generator/graphics"
import { createSprite } from "@/helpers/graphics/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/graphics/gremlin/generator/sprite/nineSliceSprite"
import { getRandomColor } from "@/utils/functions/color"
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
    position: { x: matrixItem.x, y: matrixItem.y }
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
    position: { x: matrixItem.x, y: matrixItem.y }
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
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  /* 1. 通过 pixi 的 API 创建九宫格模式精灵对象 */
  loadTexture(textureURL).then((texture: Texture) => {
    createNineSliceSprite(child, {
      texture,
      width: 500,
      height: 500,
      leftWidth: 10,
      rightWidth: 10,
      topHeight: 10,
      bottomHeight: 10
    })
  })

  /* 2. 借助 Canvas 的 API 创建九宫格模式精灵对象 */
  // const nineSpriteURL =
  // nineSliceSprite(textureURL)
  // loadTexture(nineSpriteURL).then((texture: Texture) => {
  //   createSprite(child, {
  //     texture
  //   })
  // })
}

function debugPixiSprite(_layerContainer: Container): void {
  // if (!information) {
  //   webWarn("debugPixiSprite", "Warn", "AppInfo is null")
  //   return
  // }
  // const sampleURL = replaceNormalize(
  //   `local://${information.core}/resources/images/sample.png`
  // )
  // debugLocalTexture(layerContainer, sampleURL)
  // const eggHeadURL = "https://pixijs.com/assets/eggHead.png"
  // debugNineSliceSprite(layerContainer, eggHeadURL)
  // const frameURL = replaceNormalize(
  //   `local://${information.core}/resources/images/frame.png`
  // )
  // debugSwitchSprite(layerContainer, frameURL)
  // const textureURL = replaceNormalize(
  //   `local://${information.core}/resources/images/itemBox.png`
  // )
  // debugNineSliceSprite(layerContainer, textureURL)
}

export default debugPixiSprite
