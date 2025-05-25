import type { AppState } from "@/stores/interface/appSlice"

function setInformation(
  state: AppState,
  action: {
    payload: any
    type: string
  }
): void {
  state.information = action.payload
}

export default setInformation
