import { enableWindowMessagesListener } from "@/helpers/manager/listener"

export function messageListener() {
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
}
