/**
 * @file 应用准备就绪时的处理
 */
import { homedir } from 'node:os';
import Helper from '@/electron/helper';
import { debugLog } from '@/common/helper/log';
import { Environment } from '@/common/constant';
import { getWebUrl } from '@/electron/server/helper';
import { windowOptions } from '@/electron/config/options';
import { loadExtension } from '@/electron/handler/loadExtension';

// const CWD = process.cwd(); /*  当前工作目录 */
const IsProd = process.env?.NODE_ENV === Environment.Prod;
const ModuleID = module.id; /*  当前模块的 id - 模块路径 */

/**
 * @event `ready`
 * @description 应用准备就绪后执行的回调
 * @platform _`Windows`_ | _`Linux`_ | _`MacOS`_
 * @listener
 * - `event`: Event
 * - `launchInfo`: Record<string, any>) | (NotificationResponse  --- `**MacOS**`
 * @summary
 * 在 `macOS` 上，如果通过通知中心启动应用程序，`launchInfo` 保存 `NSUserNotification`
 * 的 `userInfo` 或 `UNNotificationResponse` 的信息。
 * 可以通过调用 `app.isReady()` 来检查该事件是否已被触发，以及通过 `app.whenReady()`
 * 得到一个当 Electron 已初始化后 fullfill 的 Promise。
 * @remarks
 * - 当 Electron 完成初始化时，发出一次。
 * - 替代了 `app.on('ready', ()=>{})` 的用法
 * - 在 `will-finish-launching` 之后，`ready` 事件将触发。
 */
async function onAppReady() {
  try {
    await loadExtension();
    const webURL = getWebUrl();
    const params: MainProcess.WindowParams = {
      minize: {
        width: 800,
        height: 600
      },
      isRemote: true,
      debug: process.env?.IS_DEBUG === 'true'
    };
    Helper.createWindow(webURL, windowOptions, params);
    debugLog(ModuleID, 'onAppReady', IsProd, homedir());
  } catch (error) {
    const msgTitle = 'Failed to start the application';
    const msg =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred!';
    // showErrorBox(msgTitle, msg);
    debugLog(ModuleID, 'onAppReady', true, msgTitle, msg);
  }
}

export default onAppReady;
