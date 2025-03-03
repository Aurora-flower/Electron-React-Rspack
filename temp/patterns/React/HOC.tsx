/**
 * @file React 模式 - 高阶组件模式（hoc pattern)
 * Higher Order Component (HOC)
 * @description
 * 高阶组件 （HOC） 是接收另一个组件的组件，一种能够在多个组件中重用相同逻辑的方法。
 *
 * @remarks
 * HOC 的最佳用例：
 * - 整个应用程序中的许多组件都需要使用相同的非自定义行为。
 * - 该组件可以独立工作，而无需添加自定义逻辑。
 *
 * Hook 的最佳用例：
 * - 必须为使用它的每个组件自定义行为。
 * - 该行为不会分布在整个应用程序中，只有一个或几个组件使用该行为。
 * - 该行为向组件添加了许多属性
 */
import React from 'react';

export function HOC<P extends object>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent = (props: P) => {
    return <Component {...props} />;
  };

  WrappedComponent.displayName =
    'COM:' + `HOC(${Component.displayName || Component.name})`;
  return WrappedComponent;
}
