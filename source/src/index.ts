/**
 * @file 渲染进程主入口文件
 */
import '@/src/App';
import '@/src/debug';
import '@/src/vendor';
import '@/src/static/stylesheets';
// import '@/src/static/stylesheets/tailwind';
import { debugLog } from '@/common/helper/log';

debugLog(module.id, 'Main Entry', false, 'hello world');
