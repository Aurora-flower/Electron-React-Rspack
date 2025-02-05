import { debugLog } from '@/common/helper/log';

/**
 * 自定义无边框菜单的点击事件处理
 * @param ev 点击事件
 */
export function appMenuAction(
  ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  const action =
    ev.currentTarget.dataset
      .action; /* .getAttribute('data-action') */
  debugLog(module.id, 'customMenuAction', false, action);
}
