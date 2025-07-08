import type { ComponentType, JSX } from "react"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import { webLog } from "@/utils/log"

interface HOCProps {
  [k: string]: AnyModel
}

function HOCPage<P extends HOCProps>(
  Component: ComponentType<P>
): ComponentType<P> {
  const compName = `${Component.displayName || Component.name}`
  const WrappedComponent = (props: P): JSX.Element => {
    webLog("HOC_Page", `${compName}`)
    const enhancedProps = {
      ...props
    }
    return <Component {...enhancedProps} />
  }
  WrappedComponent.displayName = `COM:HOC_PAGE(${compName})`
  return WrappedComponent
}

export default HOCPage
