import { webLog } from "@/helpers/log"
import { enableWindowMessagesListener } from "@/helpers/manager/listener"

export function messageListener() {
  enableWindowMessagesListener(event => {
    const ev = event as MessageEvent
    const origin = ev.origin || location.href
    webLog("messageListener", "onMsg", origin, ev.data, ev.ports, ev.source)
  })

  // enableWindowMessagesListener(event => {
  //   const ev = event as MessageEvent
  //   event.stopImmediatePropagation()
  //   const origin = ev.origin || location.href
  // })
}
