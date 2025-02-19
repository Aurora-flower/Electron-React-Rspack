/**
 * @file React 主入口文件
 * @see {@link https://zh-hans.react.dev/learn React文档}
 */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { createRoot } from 'react-dom/client';
import { appMenuAction } from '@/src/helpers';
import { debugLog } from '@/common/helper/log';

/**
 * @summary React 应用主组件
 */
function App() {
  /* 定义基础样式 */
  const [baseStyles, setBaseStyles] = React.useState(
    'text-3xl font-bold underline bg-red-200'
  );

  /* 使用 useEffect 来处理副作用（如定时器） */
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBaseStyles(
        prevStyles =>
          `${prevStyles} animate__animated animate__bounce`
      );
    }, 4000);

    /* 清理定时器 */
    return () => clearTimeout(timer);
  }, []);

  const AppView = (
    <React.StrictMode>
      <div className='root-wrapper'>
        <div className={baseStyles}>应用程序</div>
        <Icon icon='medical-icon:gift-shop'></Icon>
        <div onClick={appMenuAction}>
          <button
            className='menu-item'
            data-action='open'>
            打开文件
          </button>
          <button
            className='menu-item'
            data-action='debug'>
            调试工具
          </button>
          <a
            href='http://127.0.0.1:59080/'
            download='fonts/YeZi Graffiti.8e1b9776ab4abc148550.woff'>
            下载
          </a>
        </div>
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
