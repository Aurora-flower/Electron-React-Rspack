import onAppReady from "@main/handlers/event/onAppReady"
import onAppReadyBefore from "@main/handlers/event/onAppReadyBefore"
import commandLines from "@main/helpers/function/commandLines"
import Logger from "electron-log"

function advanceExecution() {
  commandLines()
}
;(function init() {
  advanceExecution()
  onAppReadyBefore().then(onAppReady).catch(console.error)
  Logger.info(process.env.DEV_SERVER_URL, process.env.TITLE)
})()
