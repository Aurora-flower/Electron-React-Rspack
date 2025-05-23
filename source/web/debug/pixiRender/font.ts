import { Assets } from "pixi.js"

export function debugPixiFont(): void {
  Assets.addBundle("fonts", [
    {
      alias: "Lineal",
      src: "https://pixijs.com/assets/webfont-loader/Lineal.otf"
    },
    {
      alias: "Dotrice Regular",
      src: "https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff"
    },
    {
      alias: "Crosterian",
      src: "https://pixijs.com/assets/webfont-loader/Crosterian.woff2"
    }
    // {
    //   alias: "ChaChicle",
    //   src: "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
    // },
    // {
    //   alias: "YiShu",
    //   src: "local://F:/Project/Electron-React-Rspack/core/resources/font/yishu.ttf"
    // }
  ])

  Assets.loadBundle("fonts").then(() => {
    // const text = new HTMLText({
    //   text: "Dotrice Regular.woff",
    //   style: {
    //     fontFamily: "Dotrice Regular",
    //     fontSize: 50,
    //     fill: 0xffffff
    //   }
    // })
  })
}
