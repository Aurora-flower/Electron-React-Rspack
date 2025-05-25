import appReducer from "@/stores/reducers/app"
import { configureStore } from "@reduxjs/toolkit"

const stores = configureStore({
  reducer: {
    app: appReducer
  }
})

export default stores

export type RootState = ReturnType<typeof stores.getState>
