import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import { createContext, useContext, useState } from "react"
import type { Dispatch, JSX, SetStateAction } from "react"

const StoreContext = createContext<{
  count: number
  setCount: Dispatch<SetStateAction<number>>
}>({
  count: 0,
  setCount: (): void => {
    webLog("StoreContext", "setCount", "noop")
  }
})

export const StoreProvider = (props: {
  children: JSX.Element
}): JSX.Element => {
  const [count, setCount] = useState(0)

  return (
    <StoreContext.Provider value={{ count, setCount }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = (): unknown => useContext(StoreContext)
