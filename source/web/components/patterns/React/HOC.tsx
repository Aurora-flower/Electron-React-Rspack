import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { ComponentType, JSX } from "react"

interface HOCProps {
  logSource: string
}

/**
 * @summary React 模式 - 高阶组件模式（HOC Pattern) - Higher Order Component (HOC)
 * @description
 * 高阶组件是接收另一个组件的组件，一种能够在多个组件中重用相同逻辑的方法。
 * @remarks
 * - 整个应用程序中的许多组件都需要使用相同的非自定义行为。
 * - 该组件可以独立工作，而无需添加自定义逻辑。
 * - 必须为使用它的每个组件自定义行为。
 * - 该行为不会分布在整个应用程序中，只有一个或几个组件使用该行为。
 * - 该行为向组件添加了许多属性
 */
function HOC<P extends HOCProps>(
  Component: ComponentType<P>
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

// const EnhancedComp = HOC(Comp)

export default HOC
