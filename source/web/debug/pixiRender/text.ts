import type { Container } from "pixi.js"
import { HTMLText } from "pixi.js"
import PixiManager from "@/helpers/graphics/gremlin"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"

export function debugPixiHTMLText(container: Container): void {
  const matrixItem = PixiManager.findUsableMatrix()
  if (!matrixItem) return
  const child = createContainer(container, {
    position: { x: matrixItem.x, y: matrixItem.y }
  })
  const ChaChicle = new HTMLText({
    text: "ChaChicle!",
    style: {
      fontFamily: "Chachicle",
      fontSize: 24,
      fill: 0xff1010,
      align: "center"
    },
    x: 0,
    y: 0
  })
  const Lineal = new HTMLText({
    text: "Lineal!",
    style: {
      fontFamily: "Lineal",
      fontSize: 24,
      fill: 0xff1010,
      align: "center"
    },
    x: 0,
    y: 40
  })
  const Dotrice = new HTMLText({
    text: "Dotrice Regular!",
    style: {
      fontFamily: "Dotrice Regular",
      fontSize: 24,
      fill: 0xff1010,
      align: "center"
    },
    x: 0,
    y: 40 * 2
  })
  const Crosterian = new HTMLText({
    text: "Crosterian!",
    style: {
      fontFamily: "Crosterian",
      fontSize: 24,
      fill: 0xff1010,
      align: "center"
    },
    x: 0,
    y: 40 * 3
  })
  child.addChild(ChaChicle, Lineal, Dotrice, Crosterian)
}

function debugPixiText(_layerContainer: Container): void {
  // if (!information) {
  //   return
  // }
  // Assets.load(
  //   // `local://${information.core}/resources/fonts/ChaChicle.woff`
  //   "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
  // ).then((font: FontFace) => {
  //   const Chachicle = font.family
  //   Assets.addBundle("fonts", {
  //     [Chachicle]: replaceNormalize(
  //       // `local://${information.core}/resources/fonts/ChaChicle.woff`
  //       "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
  //     ), // https://pixijs.com/assets/webfont-loader/ChaChicle.ttf'
  //     "Dotrice Regular": replaceNormalize(
  //       `local://${information.core}/resources/fonts/Dotrice-Regular.woff`
  //     ), // "https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff"
  //     Lineal: "https://pixijs.com/assets/webfont-loader/Lineal.otf",
  //     Crosterian: "https://pixijs.com/assets/webfont-loader/Crosterian.woff2"
  //   })
  //   Assets.loadBundle("fonts").then(() => {
  //     debugPixiHTMLText(layerContainer)
  //   })
  // })
}

export default debugPixiText
