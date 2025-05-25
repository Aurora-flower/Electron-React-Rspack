import onAppReady from "@main/handlers/event/onAppReady"
import onAppReadyBefore from "@main/handlers/event/onAppReadyBefore"
import commandLines from "@main/helpers/function/commandLines"
import { setAsDefaultProtocolClient } from "@main/helpers/modules/protocol"

function advanceExecution(): void {
  setAsDefaultProtocolClient()
  commandLines()
}

function initialization(): void {
  advanceExecution()
  onAppReadyBefore().then(onAppReady).catch(console.error)
}

initialization()
