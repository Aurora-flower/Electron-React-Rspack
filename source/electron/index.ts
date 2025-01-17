/**
 * @file 主进程文件主入口
 * @see {@link https://www.electronjs.org/zh/docs/latest/ Electron 官方中文文档}
 */
import { app } from 'electron';
import { debugLog } from '@/common/log';
import { createWindow } from '@/electron/helper';
import { join } from 'path';

// const CWD = process.cwd(); /*  当前工作目录 */
const ModuleID = module.id; /*  当前模块的 id - 模块路径 */

/**
 * @summary 应用准备就绪后执行的回调
 */
async function onAppReady() {
  try {
    // './app/renderer/public/index.html'
    createWindow(
      'http://localhost:59080/',
      {
        width: 1200,
        height: 800,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          nodeIntegration: false,
          contextIsolation: true
        }
      },
      {
        isRemote: true
      }
    );
    debugLog(
      ModuleID,
      'onAppReady',
      'start',
      process.env.IS_DEBUG
    );
  } catch (error) {
    const msgTitle = 'Failed to start the application';
    const msg =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred!';
    // showErrorBox(msgTitle, msg);
    debugLog(ModuleID, 'onAppReady', msgTitle, msg);
  }
}

/**
 * @platform _`Windows`_ | _`Linux`_ | _`MacOS`_
 * @event `ready`
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
app.whenReady().then(onAppReady);
