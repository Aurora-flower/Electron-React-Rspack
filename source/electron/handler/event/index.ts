/**
 * @file 应用事件监听
 */
import { app } from 'electron';
import debugLog from '@/electron/tools/log';
import onAppReady from '@/electron/handler/onAppReady';
import onAppReadyAfter from '@/electron/handler/onAppReadyAfter';
import onAppReadyBefore from '@/electron/handler/onAppReadyBefore';

/* ***** ***** ***** ***** 应用事件监听(已启用) ***** ***** ***** ***** */

/**
 * @summary 准备工作
 * @description
 * 通常使用触发器的 `.on` 函数来监听 Node.js 事件。
 * 但是 Electron 暴露了 `app.whenReady()` 方法，作为其 ready 事件的专用监听器，
 * 这样可以避免直接监听 `.on` 事件带来的一些问题。
 */
function ready() {
  onAppReadyBefore();
  app
    .whenReady()
    .then(() => {
      onAppReady();
    })
    .finally(onAppReadyAfter)
    .catch(reason => {
      debugLog(
        {
          id: module.id,
          sign: 'Ready Error'
        },
        reason
      );
    });
}

export function onAppEventListeners() {
  ready();
}
