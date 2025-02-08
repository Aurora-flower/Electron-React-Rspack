/**
 * @file 系统通知
 */
import { Notification } from 'electron';

/**
 * 显示通知
 * @param title 标题
 * @param body 内容
 */
export function showNotification(title: string, body: string) {
  // const notification = new Notification({
  //   title,
  //   body,
  // });
  // node-notifier --- 可能需要加入不打包的配置

  const notifer = new Notification({
    title,
    body
  });
  notifer.show();
}
