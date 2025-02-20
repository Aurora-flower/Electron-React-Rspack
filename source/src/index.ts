/**
 * @file 渲染进程主入口文件
 */
import '@/src/App';
import '@/src/static/stylesheets';
import { getOS } from '@/common/api/web/device';
// import '@/src/static/stylesheets/tailwind';
import { debugLog } from '@/common/helper/log';

debugLog(
  {
    id: module.id,
    sign: 'Main Entry'
  },
  navigator.userAgent,
  getOS()
);
