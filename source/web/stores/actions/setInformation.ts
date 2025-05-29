import type { AppState } from "@/stores/interface/appSlice"
import { webLog } from "@/utils/log"

function setInformation(
  state: AppState,
  action: {
    payload: AnyModel
    type: string
  }
): void {
  state.information = action.payload
  webLog("Store", "setInformation", state.information)
}

export default setInformation
