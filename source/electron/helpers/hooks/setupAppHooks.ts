import { onActivate } from "@main/features/application/listeners/onActivate"
import { onOpenFile } from "@main/features/application/listeners/onOpenFile"
import { onOpenURL } from "@main/features/application/listeners/onOpenURL"
import { onWindowAllClosed } from "@main/features/application/listeners/onWindowAllColsed"

function setupAppHooks(): void {
  onWindowAllClosed()
  onActivate()
}

export function setupAppHooksOnBeforeReady(): void {
  onOpenURL()
  onOpenFile()
}

export default setupAppHooks
