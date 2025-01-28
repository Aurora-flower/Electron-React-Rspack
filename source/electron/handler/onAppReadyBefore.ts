/**
 * @file 在应用加载完成之前的处理
 */

import { startServer } from '@/electron/server';

/**
 * @summary
 * 应用加载完成之前执行的回调
 */
async function onAppReadyBefore() {
  startServer();
  // try {
  // } catch (error) {
  // }
}

export default onAppReadyBefore;
