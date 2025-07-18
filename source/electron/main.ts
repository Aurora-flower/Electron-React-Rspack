import onAppReady, {
  onAppReadyBefore
} from "@main/features/application/event/onAppReady"
import onSecondInstance from "@main/features/application/event/onSecondInstance"
import { gotSingleInstanceLock } from "@main/features/application/methods/singleInstanceLock"
import { app } from "electron"

const gotTheLock = gotSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  onSecondInstance()
  onAppReadyBefore().then(onAppReady).catch(console.error)
}
