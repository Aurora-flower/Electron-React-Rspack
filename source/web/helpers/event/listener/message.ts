import { getOrigin } from "@/features/window/location"
import { webLog } from "@/utils/log"

const MESSAGE_IGNORE_SIGN = [
  /* react devtools installer */
  "react-devtools-content-script",
  "react-devtools-bridge",
  "react-devtools-hook",
  "react-devtools-backend-manager"
]

export function messageListener(event: Event): void {
  const ev = event as MessageEvent
  // event.stopImmediatePropagation()
  const origin = ev.origin || getOrigin()
  if (MESSAGE_IGNORE_SIGN.includes(ev.data.source)) {
    return
  }
  webLog(
    "message",
    "onMsg",
    origin,
    ev.data?.source,
    ev.data,
    ev.ports,
    ev.source
  )
}
