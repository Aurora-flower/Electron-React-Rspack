import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { ComponentType, JSX } from "react"

interface HOCProps {
  [k: string]: AnyModel
}

function HOCPanel<P extends HOCProps>(
  Component: ComponentType<P>
): ComponentType<P> {
  const compName = `${Component.displayName || Component.name}`
  const WrappedComponent = (props: P): JSX.Element => {
    webLog("HOC_Panel", `${compName}`)
    const enhancedProps = {
      ...props
    }
    return <Component {...enhancedProps} />
  }
  WrappedComponent.displayName = `COM:HOC_PANEL(${compName})`
  return WrappedComponent
}

export default HOCPanel
