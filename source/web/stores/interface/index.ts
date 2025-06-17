import type stores from "@/stores"

export type RootState = ReturnType<typeof stores.getState>

export type AppDispatch = typeof stores.dispatch
