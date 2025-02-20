/**
 * @file React 主入口文件
 * @see {@link https://zh-hans.react.dev/learn React文档}
 */
import * as React from 'react';
import AppRouter from '@/src/router';
import { createRoot } from 'react-dom/client';
import { debugLog } from '@/common/helper/log';

/**
 * @summary React 应用主组件
 */
function App() {
  const AppView = (
    <React.StrictMode>
      <div className='root-wrapper'>
        <AppRouter></AppRouter>
      </div>
    </React.StrictMode>
  );
  return AppView;
}

/**
 * @summary 渲染 React 应用
 * @remarks
 * 应用使用了 React.StrictMode，那么在开发环境下，
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
  debugLog({
    id: module.id,
    sign: 'Document-Render test'
  });
}

AppRender();
