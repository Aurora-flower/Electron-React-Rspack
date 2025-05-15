import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { ComponentType, JSX } from "react"

interface HOCProps {
  logSource: string
}

function HOC<P extends object>(
  Component: ComponentType<P & HOCProps>
): ComponentType<P> {
  const compName = `${Component.displayName || Component.name}`
  const WrappedComponent = (props: P): JSX.Element => {
    webLog("HOC", `${compName}`)
    const enhancedProps = {
      ...props,
      logSource: "HOC"
    }
    return <Component {...enhancedProps} />
  }
  WrappedComponent.displayName = `COM:HOC(${compName})`
  return WrappedComponent
}

export default HOC
