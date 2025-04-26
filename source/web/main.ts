import { enableWindowMessagesListener } from "@/helpers/event/listener";
import { sender } from "@/helpers/event/electron";

document.body.innerHTML = `<div id="app">HELLO WORLD!</div>`;

sender("sms:transmit", {
  channel: "sms:transmit",
  msg: "Hello World!",
});

enableWindowMessagesListener((event) => {
  const ev = event as MessageEvent;
  event.stopImmediatePropagation();
  const origin = ev.origin || location.href;
  console.log("[onMsg]", ev, origin, ev.data, ev.source);
});
