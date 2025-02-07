/**
 * @file 常用的配置项
 */
import Helper from '@/electron/helper';

const { isWin, getAppAsarOutput } = Helper;

/**
 * @summary 窗口默认配置项
 * @remarks
 * - 父子窗口：
 *   通过使用 parent 选项创建子窗口，子窗口将总是显示在父窗口的顶部
 * - 模态窗口：
 *   模态窗口是禁用父窗口的子窗口。 要创建模态窗口，必须同时设置 parent 和 modal 属性
 */
export const windowOptions: Electron.BrowserWindowConstructorOptions =
  {
    /* 窗口标题 - 默认为应用名称 | html 的 title 标签的内容 | package.json 的 name */
    // title: '花楹一间',

    /* 应用图标 */
    icon: getAppAsarOutput('public/favicon.ico'),

    /* 窗口的尺寸 */
    // width: 800,
    // height: 600,

    /* 窗口是否可见 - 搭配 ready-to-show 事件使用，用于优化显示时机，避免白屏 */
    // show: false,

    /* 最初隐藏时绘制 */
    // paintWhenInitiallyHidden: true,

    /* 窗口是否无边框 */
    frame: !isWin(),

    /* 窗口是否透明 */
    // transparent: true,

    /* 窗口首选项 */
    webPreferences: {
      /* 预加载脚本 */
      preload: getAppAsarOutput('preload/index.js'),

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

      /* 启用 webview 标签 - 注意📢： 不建议使用 WebView，因为这个标签会发生剧烈的结构变化，可能会影响应用程序的稳定性。 */
      // webviewTag: false,
    }
  };
