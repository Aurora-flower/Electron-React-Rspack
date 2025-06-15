// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

/**
 * @summary React 模式 - 复合模式（Compound Pattern) - Higher Order Component (HOC)
 * @description
 * 复合组件模式允许创建所有协同工作以执行任务的组件。通过共享状态相互依赖，并共同共享逻辑。
 */
function Compound(): JSX.Element {
  return <div>Compound</div>
}

export default Compound
