/**
 * @file react-router-dom 路由服务
 * @description 使用 React Router 构建路由服务
 * @see {@link https://reactrouter.com/en/main/start/overview React-Router-Dom 文档}
 */
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from 'react-router-dom';
import * as React from 'react';

// 客户端路由配置
const RouteOptions: RouteObject[] = [
  {
    path: '/',
    element: <div data-date={new Date()}></div>,
    children: [
      /**
       * @summary 嵌套路由是将 URL 的片段与组件层次结构和数据耦合在一起的总体思路。
       * */
    ]
  }
];

// 创建路由器实例
const Router = createBrowserRouter(RouteOptions, {
  // (目前已经升级为 7 版本)解决警告：来自 React Router，意思是 React Router v7 在未来的版本中会将状态更新（state updates）包装在 React.startTransition 中，从而使得状态更新的过程更平滑，避免界面卡顿或阻塞。
  // future: {
  //   v7_skipActionErrorRevalidation: true,
  //   v7_relativeSplatPath: true,
  //   v7_partialHydration: true,
  //   v7_fetcherPersist: true,
  //   v7_normalizeFormMethod: true
  // }
});

/**
 * 渲染路由组件.
 * @returns {React.JSX.Element} 路由组件.
 */
function AppRouter(): React.JSX.Element {
  return (
    <RouterProvider
      router={Router}
      // future={
      //   // 设置 v7_startTransition 未来标志来启用
      //   {
      //     v7_startTransition: true
      //   }
      // }
    />
  );
}

export default AppRouter;
