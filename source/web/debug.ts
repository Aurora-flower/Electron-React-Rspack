import { sender } from "@/helpers/event/electron"
import { getDomElement } from "@/utils/mod/dom"
import {
  Application,
  type ApplicationOptions,
  Assets,
  Container,
  Sprite,
  Text
} from "pixi.js"

import { enableWorker } from "@/handlers/worker/registry"

export function debugWorker() {
  const workerPath = new URL(
    "../../core/scripts/javascript/worker.js",
    location.href
  )?.pathname
  enableWorker(workerPath, {
    type: "module"
  })
}

export async function debugPixiRender() {
  const root = "#pixi-container"
  const app = new Application()
  const element = getDomElement(root)
  if (!element) {
    return
  }
  await app.init({
    antialias: true,
    resizeTo: element
  } as Partial<ApplicationOptions>)
  element.appendChild(app.canvas)
  const url = `local://${"F:\\SERVER\\release\\ER\\sample.png"}` //
  Assets.load(url).then(texture => {
    const container = new Container()
    const sprite = new Sprite({ texture })
    const text = new Text({
      text: "Hello World!",
      style: {
        fontSize: 40,
        fill: 0xffffff,
        fontFamily: "Arial"
      }
    })
    container.addChild(text)
    container.addChild(sprite)
    const container2 = new Container()
    const text2 = new Text({
      text: "Hello Text!",
      style: {
        fontSize: 40,
        fill: 0xffffff,
        fontFamily: "Arial"
      }
    })
    container2.addChild(text2)
    container.addChild(container2)
    app.stage.addChild(container)
  })
}

export function debugIPC() {
  sender("sms:transmit", {
    type: "sms:transmit",
    data: {
      channel: "sms:transmit",
      msg: "Hello World!"
    }
  } as Message)
}

async function debug() {
  // await debugPixiRender()
  debugIPC()
  // debugWorker()
}

export default debug
