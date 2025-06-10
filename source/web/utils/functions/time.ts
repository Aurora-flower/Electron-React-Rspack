// import { webLog } from "@/utils/log"

function timeStamp(): number {
  // webLog("time", "time stamp", Date.now())
  return Date.now()
}

export function delay(
  duration: number,
  callback: () => void = timeStamp
): void {
  const start = Date.now()
  while (Date.now() - start < duration) {
    callback()
  }
}
