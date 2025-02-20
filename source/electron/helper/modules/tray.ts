/**
 * @file 系统托盘
 */
// import { createWindow } from './window';
import { joinPath } from '@/electron/utils/path';
// import debugLog from '@/electron/tools/log';
import { nativeImage, Tray, Menu } from 'electron';

/**
 * @summary 设置系统托盘
 */
export async function setTray() {
  const iconPath = joinPath(__dirname, 'images/tray.png');
  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    // {
    //   label: '花楹一间',
    //   type: 'radio',
    //   // checked: true, // 默认选中
    //   click: function () {
    //     debugLog(module.id, '花楹一间');
    //   }
    // },
    // {
    //   label: '博客',
    //   type: 'radio',
    //   click: function () {
    //     const blogURL = 'https://aurora-flower.github.io/';
    //     createWindow(blogURL, {
    //       isMainWindow: false
    //     });
    //     debugLog(module.id, '花楹一间博客');
    //   }
    // }
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('花楹一间');
  tray.setTitle('HuaYing');
}
