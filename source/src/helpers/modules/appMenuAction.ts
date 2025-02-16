import { debugLog } from '@/common/helper/log';

/**
 * 自定义无边框菜单的点击事件处理
 * @param ev 点击事件
 */
export function appMenuAction(
  ev: React.MouseEvent<HTMLElement, MouseEvent>
) {
  /**
   * @summary 获取自定义菜单的 action 属性的方式
   * @description
   * 获取自定义属性的方式
   * - (ev.target as HTMLElement).dataset.action
   * - (ev.target as HTMLElement).getAttribute('data-action')
   */
  const action = (ev.target as HTMLElement).getAttribute(
    'data-action'
  );
  debugLog(module.id, 'CustomMenuAction', false, action);
}
