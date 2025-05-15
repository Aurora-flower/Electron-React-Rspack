import { webLog } from "@/utils/log"
import { enableWindowMessagesListener } from "@/utils/manager/listener"

export function messageListener(/* this: void */): void {
  enableWindowMessagesListener(event => {
    const ev = event as MessageEvent
    const origin = ev.origin || location.href
    if (
      [
        "react-devtools-content-script",
        "react-devtools-bridge",
        "ev.data.source",
        "react-devtools-hook",
        "react-devtools-backend-manager"
      ].includes(ev.data.source)
    ) {
      return
    }
    webLog("messageListener", "onMsg", origin, ev.data, ev.ports, ev.source)
  })

  // enableWindowMessagesListener(event => {
  //   const ev = event as MessageEvent
  //   event.stopImmediatePropagation()
  //   const origin = ev.origin || location.href
  // })
}
