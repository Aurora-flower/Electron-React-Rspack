import { createAction, createReducer } from "@reduxjs/toolkit"

const increment = createAction<number>("counter/increment")
const decrement = createAction<number>("counter/decrement")

const counterReducer = createReducer(0, builder => {
  // extraReducers
  builder.addCase(increment, (state, action) => state + action.payload)
  builder.addCase(decrement, (state, action) => state - action.payload)
})

export default counterReducer
