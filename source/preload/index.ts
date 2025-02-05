/**
 * @file electron 预加载进程的文件
 * @summary
 * 从 Electron 20 开始，预加载脚本默认 `沙盒化` ，不再拥有完整 Node.js 环境的访问权。
 * - `Electron` 模块: 	        渲染进程模块
 * - `Node.js` 模块:  	        events、timers、url
 * - `Polyfilled` 的全局模块:	   Buffer、process、clearImmediate、setImmediate
 */
// import { contextBridge, ipcRenderer } from 'electron';

import { debugLog } from '@/common/helper/log';

/**
 * @summary
 * window 监听 load 事件 | [window、document] 监听 DOMContentLoaded 事件
 *
 * ```ts
 * window.addEventListener('DOMContentLoaded', handle);
 * document.addEventListener('DOMContentLoaded', handle);
 * ```
 *
 * @remarks
 * - document 先于 window 执行
 * - DOMContentLoaded 通常比 onload 更早触发，有助于提升页面的响应性和性能。
 *
 * ---
 * ```markdown
 * | 特性	| window.onload	 | window.addEventListener('DOMContentLoaded', handle)  |
 * | -------- | ---------------------------------- | ------------------------------------------- |
 * | **触发时机**	| 页面及所有资源（包括图片、CSS等）加载完成后	| DOM结构解析完成后（不等待图片等资源加载） |
 * | **可添加多个事件处理器**	| 不支持多个事件处理器（会覆盖）	| 支持多个事件处理器  |
 * | **兼容性**	| 支持所有浏览器	| 现代浏览器支持较好，但旧版浏览器可能不支持  |
 * | **常用场景**	| 当需要确保所有资源（包括图片等）加载完成后	| 当只关心DOM结构加载完成，页面内容可交互时 |
 * ```
 */
function runtimeLoadHandle() {
  // Tip: 对于现代 Web 开发，推荐使用 DOMContentLoaded 事件
  // window.onload = function () {
  //   console.log('Window loaded successfully!');
  // };

  document.addEventListener('DOMContentLoaded', () => {
    debugLog(module.id, 'Document-DOMContentLoaded', false);

    // 鼠标穿透 - 在 macOS | Windows 平台上转发鼠标事件
    // const el = document.getElementById('clickThroughElement')
    // el.addEventListener('mouseenter', () => {
    //   ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    // })
    // el.addEventListener('mouseleave', () => {
    //   ipcRenderer.send('set-ignore-mouse-events', false)
    // })
    domReady().then(appendLoading);
  });
}

runtimeLoadHandle();

/* ***** ***** ***** ***** loading 加载 ***** ***** ***** ***** */
const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child);
    }
  },

  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child);
    }
  }
};

/**
 * @summary 加载动画
 * @see {@link https://tobiasahlin.com/spinkit 加载动画示例-spinkit}
 * @see {@link https://connoratherton.com/loaders 加载动画示例-loaders}
 * @see {@link https://projects.lukehaas.me/css-loaders 加载动画示例-css-loaders}
 * @see {@link https://matejkustec.github.io/SpinThatShit 加载动画示例-SpinThatShit}
 */
function useLoading() {
  const containerId = `loader`;
  const oDiv = document.createElement('div');
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `<div id="${containerId}">
    <div class="loader-container"></div>
  </div>`;
  return {
    appendLoading() {
      const root = document.body.querySelector('#root');
      if (!root) return;
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.body, oDiv);
    }
  };
}

/**
 * @summary 监听 DOM 加载完成事件
 * @remarks
 * - readyState: complete | interactive | loading 表示当前页面状态
 * - 浏览器加载状态：loading -> interactive -> complete
 * @see {@link https://javascript.info/onload-ondomcontentloaded}
 */
function domReady(
  condition: DocumentReadyState[] = ['complete', 'interactive'] // "complete" | "interactive" | "loading"
) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const { appendLoading, removeLoading } = useLoading();

setTimeout(removeLoading, 1999);

// 主进程与渲染进程通信严格分离 |  区分  Node.js 与 Web 环境的 API

// TODO: 只需要定义一个函数，然后根据参数的不同去调用不同的 ipc 事件 | 只需要区分 有返回值 | 无返回值 | 异步 | 同步  这几种情况 （或者按照 ipc 事件的类型去区分）
