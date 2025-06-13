import commandLines from "@main/features/application/commandLines"
import { setAsDefaultProtocolClient } from "@main/features/protocol"
import onAppReady from "@main/handlers/event/onAppReady"
import onAppReadyBefore from "@main/handlers/event/onAppReadyBefore"

function advanceExecution(): void {
  setAsDefaultProtocolClient()
  commandLines()
}

function initialization(): void {
  advanceExecution()
  onAppReadyBefore().then(onAppReady).catch(console.error)
}

initialization()
