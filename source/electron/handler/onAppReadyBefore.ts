/**
 * @file 在应用加载完成之前的处理
 */

import { startServer } from '@/electron/server';

/**
 * @summary
 * 应用加载完成之前执行的回调
 */
async function onAppReadyBefore() {
  /* 处理创建卸载时在 Windows 系统上删除快捷方式 */
  // electron-squirrel-startup 是处理 Windows 应用安装包的工具套件
  // if (require('electron-squirrel-startup')) {
  //   app.quit();
  // }

  startServer();
  // try {
  // } catch (error) {
  // }
}

export default onAppReadyBefore;
