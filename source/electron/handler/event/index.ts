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
