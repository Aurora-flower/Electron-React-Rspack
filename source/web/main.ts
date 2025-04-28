import { sender } from "@/helpers/event/electron"
import { enableWindowMessagesListener } from "@/helpers/event/listener"
import { getRootElement } from "@/helpers/function/dom"
import {
  Application,
  type ApplicationOptions,
  Assets,
  Container,
  Sprite,
  Text
} from "pixi.js"
import "pixi.js/unsafe-eval"

const root = "#root"

sender("sms:transmit", {
  channel: "sms:transmit",
  msg: "Hello World!"
})

enableWindowMessagesListener(event => {
  const ev = event as MessageEvent
  event.stopImmediatePropagation() // 阻止传递
  const origin = ev.origin || location.href
  console.log("[onMsg]", ev, origin, ev.data, ev.source)
})

enableWindowMessagesListener(event => {
  const ev = event as MessageEvent
  event.stopImmediatePropagation()
  const origin = ev.origin || location.href
  console.log("[onMsg 2]", ev, origin, ev.data, ev.source)
})
;(async () => {
  const app = new Application()
  const element = getRootElement(root)
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
  console.log("Root", element, app, url)
})()
