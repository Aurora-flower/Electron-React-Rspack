/**
 * @file React 主入口文件
 * @see {@link https://zh-hans.react.dev/learn React文档}
 */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { debugLog } from '@/common/log';
import { createRoot } from 'react-dom/client';

/**
 * @summary React 应用主组件
 */
function App() {
  /* 定义基础样式 */
  const [baseStyles, setBaseStyles] = React.useState(
    'text-3xl font-bold underline bg-red-200'
  );

  // 使用 useEffect 来处理副作用（如定时器）
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBaseStyles(
        prevStyles =>
          `${prevStyles} animate__animated animate__bounce`
      );
    }, 4000);

    // 清理定时器
    return () => clearTimeout(timer);
  }, []);

  const AppView = (
    <React.StrictMode>
      <div className='root-wrapper'>
        <div className={baseStyles}>应用程序</div>
        <Icon icon='medical-icon:gift-shop'></Icon>
      </div>
    </React.StrictMode>
  );
  return AppView;
}

/**
 * @summary 渲染 React 应用
 * @remarks 应用使用了 React.StrictMode，那么在开发环境下，
 * React 会对每一个组件执行两次渲染以帮助开发者发现潜在的问题，比如副作用的清理问题。
 */
function AppRender() {
  /* 获取 根元素 */
  const rootElement: HTMLElement | null =
    document.getElementById('root');

  if (!rootElement) {
    return;
  }

  /** render 渲染，挂载到根元素 */
  createRoot(rootElement).render(<App />);
  debugLog(module.id, 'render', false, name);
}

AppRender();
