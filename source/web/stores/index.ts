/**
 * @file 创建 Store 管理
 * @description
 * 推荐 zustand 创建 Store
 */
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "@/stores/reducers"

/**
 * @summary Redux Store
 * @description
 * 一个 Store（configureStore） 由一个或多个 Reducer（createSlice） 组成，
 * 而一个 Reducer 是由一个 Action Creator（createAction）辅助函数创建的。
 */
const stores = configureStore({
  reducer: rootReducer
})

export default stores
