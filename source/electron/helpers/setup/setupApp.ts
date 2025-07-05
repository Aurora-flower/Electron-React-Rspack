import onActivate from "@main/features/application/event/onActivate"
import onOpenFile from "@main/features/application/event/onOpenFile"
import onOpenURL from "@main/features/application/event/onOpenURL"
import onWindowAllClosed from "@main/features/application/event/onWindowAllColsed"

function setupApp(): void {
  onWindowAllClosed()
  onActivate()
}

export function setupAppOnBeforeReady(): void {
  onOpenURL()
  onOpenFile()
}

export default setupApp
