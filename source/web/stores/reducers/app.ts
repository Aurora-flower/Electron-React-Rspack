import setInformation from "@/stores/actions/setInformation"
import type { AppState } from "@/stores/interface/appSlice"
import { createSlice } from "@reduxjs/toolkit"

const state: AppState = {
  information: null
}

export const appSlice = createSlice({
  name: "app",
  initialState: state,
  reducers: {
    setInformation
  }
})

/* 每个 case reducer 函数会生成对应的 Action creators */
export const appSliceActions = appSlice.actions

export default appSlice.reducer
