import { app } from 'electron';
import { join } from 'node:path';

const AppAsar =
  app.getAppPath(); /* 项目路径 - 打包后对应着的是 app.asar */

export const windowOptions: Electron.BrowserWindowConstructorOptions =
  {
    width: 800,
    height: 600,
    webPreferences: {
      /* 预加载脚本 */
      preload: join(AppAsar, 'app/preload/index.js'),

      /* 启用 Node.js 的集成 */
      nodeIntegration: false,

      /* 启用 Worker 的 Node.js 的集成 */
      // nodeIntegrationInWorker: true,

      /* 控制上下文隔离 */
      contextIsolation: true

      /* 启用 DevTools */
      // devTools: false

      /* 禁用 webSecurity 将会禁止同源策略并且将 allowRunningInsecureContent 属性置 true。 换句话说，这将使得来自其他站点的非安全代码被执行。 */
      // webSecurity: true

      /* 启用实验功能 */
      // experimentalFeatures: false,

      /* 允许运行不安全内容 */
      // allowRunningInsecureContent: false,
      /* 控制沙盒模式 */
      // sandbox: true,
      /* 启用离屏渲染 */
      // offscreen: true,
      /* 启用 webview 标签 - 重要提示： 不建议使用 WebView，因为这个标签会发生剧烈的结构变化，可能会影响应用程序的稳定性。 */
      // webviewTag: false,
    }
  };
