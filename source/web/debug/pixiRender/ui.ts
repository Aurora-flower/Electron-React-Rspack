import PixiManager from "@/helpers/render/gremlin"
import { getElementByLabel } from "@/helpers/render/gremlin/functions/filter"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { getRandomColor } from "@/utils/functions/color"
import { webLog } from "@/utils/log"
import {
  CheckBox,
  FancyButton,
  Input,
  ProgressBar,
  ScrollBox,
  Slider
} from "@pixi/ui"
import { type Container, Graphics } from "pixi.js"

export function debugPixiUIInput(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  loadTexture(flowerTopURL).then(texture => {
    const input = new Input({
      bg: texture,
      placeholder: "Enter text",
      padding: [11, 11, 11, 11]
      // alternatively you can use [11, 11, 11, 11] or [11, 11] or just 11 or {top: 11,right: 11,bottom: 11,left: 11}
    })
    child.addChild(input)
  })
}

export function debugPixiUIFancyButton(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  loadTexture(flowerTopURL).then(texture => {
    /* 1. FancyButton */
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
    child.addChild(fancyButton)
  })
}

export function debugPixiUICheckbox(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const spriteURL = "https://pixijs.com/assets/eggHead.png"
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  loadTexture(spriteURL).then(texture1 => {
    loadTexture(flowerTopURL).then(texture => {
      const checkBox = new CheckBox({
        style: {
          unchecked: texture,
          checked: texture1
        }
      })
      child.addChild(checkBox)
    })
  })
}

export function debugPixiUISlider(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const spriteURL = "https://pixijs.com/assets/eggHead.png"
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  loadTexture(flowerTopURL).then(texture => {
    const slider = new Slider({
      bg: texture,
      fill: texture,
      slider: spriteURL,
      min: 0,
      max: 100,
      value: 50
    })
    slider.onChange.connect(value => {
      webLog("ui", "debugPixiUISlider", `Slider changed to ${value}`)
    })
    child.addChild(slider)
  })
}

export function debugPixiUIScrollbar(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const scrollbox = new ScrollBox({
    background: 0xffffff,
    width: matrixItem.width,
    height: matrixItem.height,
    items: [
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor()),
      new Graphics().rect(0, 0, 200, 50).fill(getRandomColor())
    ]
  })
  child.addChild(scrollbox)
}

export function debugPixiUIProgressBar(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const spriteURL = "https://pixijs.com/assets/eggHead.png"
  const flowerTopURL = "https://pixijs.com/assets/flowerTop.png"
  loadTexture(spriteURL).then(texture1 => {
    loadTexture(flowerTopURL).then(texture => {
      const progressBar = new ProgressBar({
        bg: texture,
        fill: texture1,
        progress: 50,
        fillPaddings: { top: 20, right: 0, bottom: 20, left: 0 }
      })
      child.addChild(progressBar)
    })
  })
}

function debugPixiUI(): void {
  const app = PixiManager.getApp()
  const label = PixiManager.elementFlag.layer
  const layerContainer = getElementByLabel(label, app.stage)
  if (!layerContainer) return
  debugPixiUIFancyButton(layerContainer)
  debugPixiUIInput(layerContainer)
  debugPixiUICheckbox(layerContainer)
  debugPixiUISlider(layerContainer)
  debugPixiUIScrollbar(layerContainer)
  debugPixiUIProgressBar(layerContainer)
}

export default debugPixiUI
