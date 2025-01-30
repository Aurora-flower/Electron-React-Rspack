/**
 * @file 应用事件监听
 */
import { app } from 'electron';
import { onAppReady } from '@/electron/handler/onAppReady';
import onAppReadyAfter from '@/electron/handler/onAppReadyAfter';
import onAppReadyBefore from '@/electron/handler/onAppReadyBefore';
import { debugLog } from '@/common/log';

/* *********************** 应用事件监听(已启用) *********************** */

/**
 * @summary 准备工作
 */
function ready() {
  onAppReadyBefore();
  app
    .whenReady()
    .then(onAppReady)
    .catch(reason => {
      debugLog(module.id, 'readyError', true, reason);
    })
    .finally(onAppReadyAfter);
}

export function AppEventListeners() {
  ready();
}
