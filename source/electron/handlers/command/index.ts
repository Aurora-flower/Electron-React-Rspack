import { sendLog } from "@main/toolkit/logger"

export function command(instruct: string): void {
  sendLog(
    {
      level: "info",
      sign: "command"
    },
    instruct
  )
}
