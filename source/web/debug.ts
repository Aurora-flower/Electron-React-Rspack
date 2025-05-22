import { enableWorker } from "@/handlers/worker/registry"
import { sender } from "@/helpers/event/electron"
import PixiManager from "@/helpers/render/gremlin/manager"
import { webLog } from "@/utils/log"

export function debugPixiRender(): void {
  const app = PixiManager.getApp()
  webLog("debug", "debugPixiRender", app)
  // TEST
  // loadTexture(`local://${"F:\\SERVER\\release\\ER\\sample.png"}`).then(
  //   (texture: Texture) => {
  //     const react1 = createGraphics(
  //       basiskarteContainer,
  //       {
  //         interactive: true,
  //         eventMode: "static"
  //       },
  //       {
  //         x: 0,
  //         y: 0,
  //         color: 0xffffff
  //       }
  //     )
  //     // const react2 =
  //     createGraphics(layerContainer, undefined, {
  //       x: 80,
  //       y: 80,
  //       color: 0xffc0cb
  //     })
  //     const container = createContainer(layerContainer, {
  //       width: 300,
  //       height: 300
  //       // scale: {
  //       //   x: 0.7,
  //       //   y: 0.7
  //       // }
  //     })
  //     container.tint = 0x036fc2
  //     // const mask = new Graphics()
  //     // mask.rect(40, 40, 60, 60).fill(0xffffff)
  //     const sprite = createSprite(container, {
  //       texture,
  //       width: 300,
  //       height: 300
  //     })
  //     sprite.position.set(300, 300)
  //     // sprite.mask = mask
  //     // container.addChild(mask)
  //     createNineSliceSprite(container, {
  //       texture,
  //       width: 300,
  //       height: 300,
  //       leftWidth: 80,
  //       rightWidth: 80,
  //       topHeight: 80,
  //       bottomHeight: 80
  //     })
  //     Assets.addBundle("fonts", [
  //       {
  //         alias: "Lineal",
  //         src: "https://pixijs.com/assets/webfont-loader/Lineal.otf"
  //       },
  //       {
  //         alias: "Dotrice Regular",
  //         src: "https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff"
  //       },
  //       {
  //         alias: "Crosterian",
  //         src: "https://pixijs.com/assets/webfont-loader/Crosterian.woff2"
  //       }
  //       // {
  //       //   alias: "ChaChicle",
  //       //   src: "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
  //       // },
  //       // {
  //       //   alias: "YiShu",
  //       //   src: "local://F:/Project/Electron-React-Rspack/core/resources/font/yishu.ttf"
  //       // }
  //     ])
  //     // const fontFace = new FontFace(
  //     //   "ChaChicle",
  //     //   `url("https://pixijs.com/assets/webfont-loader/ChaChicle.ttf")`
  //     //   // `url("local:///D:/wzqh/qnold_zs/Qiannian/assets/resources/static/font/denglu.ttf")`
  //     // )
  //     // fontFace
  //     //   .load()
  //     //   .then(res => {
  //     //     console.log(res, "res")
  //     //   })
  //     //   .catch(err => {
  //     //     console.log(err, "err")
  //     //   })
  //     // document.fonts.add(fontFace)
  //     Assets.loadBundle("fonts").then(() => {
  //       const text2 = new HTMLText({
  //         text: "Lineal.otf",
  //         style: { fontFamily: "Lineal", fontSize: 50, fill: 0xffffff }
  //       })
  //       const text3 = new HTMLText({
  //         text: "Dotrice Regular.woff",
  //         style: {
  //           fontFamily: "Dotrice Regular",
  //           fontSize: 50,
  //           fill: 0xffffff
  //         }
  //       })
  //       const text4 = new HTMLText({
  //         text: "yishu.woff",
  //         style: {
  //           fontFamily: "ChaChicle",
  //           fontSize: 50,
  //           fill: 0xffffff
  //         }
  //       })
  //       text2.y = 150
  //       text3.y = 300
  //       text4.y = 450
  //       container.addChild(text2, text3, text4)
  //     })
  //     // const dragData = {
  //     //   offset: {
  //     //     x: 0,
  //     //     y: 0
  //     //   }
  //     // }
  //     // TEST
  //     react1.on("pointerdown", (e: FederatedPointerEvent): void => {
  //       if (e.button !== 0) return
  //       const target = e.target
  //       webLog("PixiManager", "pointerdown", target, target.constructor.name)
  //     })
  //     // setInterval | setTimeout
  //     setTimeout(() => {
  //       // rect.clear()
  //       // app.renderer.render(app.stage)
  //       // app.renderer.clear()
  //       container.position.set(
  //         container.position.x + 100,
  //         container.position.y + 100
  //       )
  //       webLog("PixiManager", "update", container.position, container.getSize())
  //     }, 3 * 1000)
  //   }
  // )
}

export function debugWorker(): void {
  const workerPath = new URL(
    "../../core/scripts/javascript/worker.js",
    location.href
  )?.pathname
  enableWorker(workerPath, {
    type: "module"
  })
}

export function debugIPC(): void {
  sender("sms:transmit", {
    source: "IPC",
    payload: {
      msg: "Hello World!"
    }
  } as Message)
}

async function debug(): Promise<void> {
  debugPixiRender()
  debugWorker()
  debugIPC()
  webLog("debug", "start debug")
}

export default debug
