/**
 * @file React 主入口文件
 * @see {@link https://zh-hans.react.dev/learn React文档}
 */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { createRoot } from 'react-dom/client';
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

  const AppView = (
    <React.StrictMode>
      <div className='root-wrapper'>
        应用程序
        <Icon icon='medical-icon:gift-shop'></Icon>
      </div>
    </React.StrictMode>
  );

  /** render 渲染，挂载到根元素 */
  createRoot(rootElement).render(AppView);
}

AppRender();
