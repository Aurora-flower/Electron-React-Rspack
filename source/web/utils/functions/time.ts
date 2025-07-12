// import { webLog } from "@/utils/log"

export function timeStamp(): number {
  // webLog("time", "time stamp", Date.now())
  return Date.now()
}

export function nowTime(): number {
  return performance.now()
}
