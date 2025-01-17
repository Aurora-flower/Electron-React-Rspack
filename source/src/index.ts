/**
 * @file 渲染进程主入口文件
 */
import '@/src/App';
import '@/src/debug';
import '@/src/vendor';
import { debugLog } from '@/common/log';

debugLog(module.id, 'Main Entry', 'hello world');
