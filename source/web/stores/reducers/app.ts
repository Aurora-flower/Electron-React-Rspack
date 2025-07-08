import { createSlice } from "@reduxjs/toolkit"
import setInformationAction from "@/stores/actions/setInformation"
import type { AppState } from "@/stores/interface/appSlice"

const initialState = {
  information: null
} satisfies AppState as AppState

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInformation: setInformationAction
  }
})

/* 每个 case reducer 函数会生成对应的 Action creators */
export const { setInformation } = appSlice.actions

export default appSlice.reducer
