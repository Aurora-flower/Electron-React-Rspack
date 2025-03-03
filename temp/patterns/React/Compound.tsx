/**
 * @file React 模式 - 复合模式（compound pattern)
 * @description
 * 优点：
 * 复合组件管理自己的内部状态，并在多个子组件之间共享该状态。在实现复合组件时，不必担心自己管理 state 状态。
 *
 * 缺点：
 * 使用 `React.Children.map`提供值的时候，组件嵌套受到限制。
 * 只有父组件的直接子组件才能访问到 props。
 * 这意味着不能将这些组件中的任何一个包装在另一个组件中。
 *
 * 与 Props 的区别：
 * - 使用 props：适合父子组件之间简单的传递控制。
 * - 使用 Context：适合跨多个层级的状态管理，或者多个组件共同控制 banner。
 *
 * @remarks
 * React.cloneElement 的组件元素 props 是浅层拷贝，将被传递的最新值覆盖。
 */

import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  JSX
} from 'react';
import { Button } from '@douyinfe/semi-ui';

/**
 * @description
 * 使用 `createContext` 创建组件能够提供与读取的 上下文（context)
 * @remarks
 * - 使用示例： createContext(defaultValue)
 * - 参数：
 *    - defaultValue：
 *
 *      当读取上下文的组件上方的树中没有匹配的上下文时，希望该上下文具有的默认值。倘若没有任何有意义的默认值，可指定其为 null。
 *      该默认值是用于作为“最后的手段”的后备方案。它是静态的，永远不会随时间改变。
 *
 * - 返回值：
 * 返回一个上下文对象，该上下文对象本身不包含任何信息。
 * 在被包裹的下方组件内调用 `useContext(Context)` 读取它。
 */
const CompoundContext = createContext<{
  open: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  toggle: () => {}
});

// Contatiner
function Compound(props: any): JSX.Element {
  const [open, toggle] = useState(false);

  // Tip: Context.Provider 为被它包裹的组件提供上下文的值
  return (
    <CompoundContext.Provider value={{ open, toggle }}>
      {props.children}
    </CompoundContext.Provider>
  );

  // 可以通过映射组件的子项来实现 Compound Component 模式。可以通过使用额外的 props 克隆它们来为这些元素
  // return (
  //   <div>
  //     {React.Children.map(props.children, child => {
  //       return React.cloneElement(
  //         child,
  //         // {...props, ...child.props}
  //         { open, toggle }
  //       );
  //     })}
  //   </div>
  // );
}

function Toggle() {
  const { open, toggle } = useContext(CompoundContext);
  return (
    <Button onClick={() => toggle(!open)}>
      {open ? 'Close' : 'Open'}
    </Button>
  );
}

function List(props: any): JSX.Element | boolean {
  const { open } = useContext(CompoundContext);
  return open && <ul>{props.children}</ul>;
}

function Item(props: any): JSX.Element | boolean {
  return <li>{props.children}</li>;
}

Compound.Item = Item;
Compound.List = List;
Compound.Toggle = Toggle;

// 使用示例
// function CompoundTemplate(): JSX.Element {
//   return (
//     <Compound>
//       <Compound.Toggle />
//       <Compound.List>
//         <Compound.Item>Item 1</Compound.Item>
//         <Compound.Item>Item 2</Compound.Item>
//       </Compound.List>
//     </Compound>
//   );
// }

export default Compound;
