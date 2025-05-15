import Logger from "electron-log"

export function command(instruct: string): void {
  Logger.log(instruct)
}
