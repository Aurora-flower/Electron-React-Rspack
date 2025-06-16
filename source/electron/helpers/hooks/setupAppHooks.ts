import onActivate from "@main/features/application/event/onActivate"
import onOpenFile from "@main/features/application/event/onOpenFile"
import onOpenURL from "@main/features/application/event/onOpenURL"
import onWindowAllClosed from "@main/features/application/event/onWindowAllColsed"

function setupAppHooks(): void {
  onWindowAllClosed()
  onActivate()
}

export function setupAppHooksOnBeforeReady(): void {
  onOpenURL()
  onOpenFile()
}

export default setupAppHooks
