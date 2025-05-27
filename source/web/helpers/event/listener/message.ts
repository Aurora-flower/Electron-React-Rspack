import { webLog } from "@/utils/log"
import { enableWindowMessagesListener } from "@/utils/manager/event/windowListnerCollect"

const MESSAGE_IGNORE_SIGN = [
  /* react devtools installer */
  "react-devtools-content-script",
  "react-devtools-bridge",
  "react-devtools-hook",
  "react-devtools-backend-manager"
]

export function messageListener(/* this: void */): void {
  enableWindowMessagesListener(event => {
    const ev = event as MessageEvent
    const origin = ev.origin || location.href
    if (MESSAGE_IGNORE_SIGN.includes(ev.data.source)) {
      return
    }
    webLog("message", "onMsg", origin, ev.data, ev.ports, ev.source)
  })

  // enableWindowMessagesListener(event => {
  //   const ev = event as MessageEvent
  //   event.stopImmediatePropagation()
  //   const origin = ev.origin || location.href
  // })
}
