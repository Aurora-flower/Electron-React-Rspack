import "pixi.js/unsafe-eval";
import { sender } from "@/helpers/event/electron";
import { getRootElement } from "@/helpers/function/dom";
import { Application, ApplicationOptions, Assets, Sprite } from "pixi.js";
import { enableWindowMessagesListener } from "@/helpers/event/listener";

const root = "#root";

sender("sms:transmit", {
  channel: "sms:transmit",
  msg: "Hello World!"
});

enableWindowMessagesListener((event) => {
  const ev = event as MessageEvent;
  event.stopImmediatePropagation(); // 阻止传递
  const origin = ev.origin || location.href;
  console.log("[onMsg]", ev, origin, ev.data, ev.source);
});

enableWindowMessagesListener((event) => {
  const ev = event as MessageEvent;
  event.stopImmediatePropagation();
  const origin = ev.origin || location.href;
  console.log("[onMsg 2]", ev, origin, ev.data, ev.source);
});

(async () => {
  const app = new Application();
  const element = getRootElement(root);
  await app.init({
    antialias: true,
    resizeTo: element
  } as Partial<ApplicationOptions>);
  element.appendChild(app.canvas);
  // const url = "local:///Users/HuaYing/Downloads/图片/bg.png"; // electron 自定义协议
  const url = "local://F:/SERVER/release/ER/sample.png";

  // Assets.load(url).then((texture) => {
  //   const sprite = new Sprite({ texture });
  //   sprite.anchor.set(0.5);
  //   app.stage.addChild(sprite);
  // });
  // fetch(url)
  //   .then((res) => {
  //     console.log("res", res);
  //   })
  //   .catch((err) => {
  //     console.log("err", err instanceof Error ? err.message : err);
  //   });
  console.log("Root", element, app, url);
})();
