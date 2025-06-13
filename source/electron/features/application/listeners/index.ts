import { onActivate } from "@main/features/application/listeners/onActivate"
import { onOpenURL } from "@main/features/application/listeners/onOpenURL"
import { onWindowAllClosed } from "@main/features/application/listeners/onWindowAllColsed"

export function setupAppHooks(): void {
  onWindowAllClosed()
  onActivate()
  onOpenURL()
}
