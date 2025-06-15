// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

/**
 * @summary React 模式 - 复合模式（Compound Pattern) - Higher Order Component (HOC)
 * @description
 * 复合组件模式允许创建所有协同工作以执行任务的组件。通过共享状态相互依赖，并共同共享逻辑。
 * Compound组件是一种将多个子组件组合成一个逻辑上完整组件的模式。
 * 它通过组合子组件来简化父子组件间的交互，通常子组件通过父组件来共享状态或行为。
 * 当需要在多个子组件之间共享一些状态或行为时，可以使用 Compound 组件。
 * @remarks
 * 使用 Context 时的注意事项：
 * - 性能问题: 由于 Context 是基于 React 的重新渲染机制的，当 context 中的值发生变化时，所有消费该 context 的组件都会重新渲染。
 * 为避免不必要的性能开销，可以考虑将 Context 用于较为全局的状态，而避免过于频繁地更新。
 * - 过度使用: 如果应用需要频繁的状态更新或者状态在局部组件之间变化，可能会导致 Context 管理过于复杂，
 * 适合的做法是只在需要共享的状态较为稳定时使用 Context。
 * - 拆分 Context: 如果某个 Context 包含的数据过于庞大或不相关，考虑拆分成多个 Context，这样每个组件只会订阅它需要的数据。
 */
function Compound(): JSX.Element {
  return <div>Compound</div>
}

export default Compound
