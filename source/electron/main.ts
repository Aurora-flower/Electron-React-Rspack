import onAppReady from "@main/handlers/event/onAppReady"
import onAppReadyBefore from "@main/handlers/event/onAppReadyBefore"
import commandLines from "@main/helpers/function/commandLines"
import { createAppServer } from "@main/server"
import Logger from "electron-log"

function advanceExecution() {
  commandLines()
}

function initialization() {
  advanceExecution()
  createAppServer()
  onAppReadyBefore().then(onAppReady).catch(console.error)
  Logger.log("DEV_SERVER_URL", process.env.DEV_SERVER_URL)
}
initialization()
