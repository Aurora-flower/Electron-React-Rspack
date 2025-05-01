import { webLog } from "@/helpers/log"

function timeStamp() {
  webLog("time", "time stamp", Date.now())
}

export function delay(duration: number, callback: () => void = timeStamp) {
  const start = Date.now()
  while (Date.now() - start < duration) {
    callback()
  }
}
