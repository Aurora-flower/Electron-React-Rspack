/**
 * @file 调试文件
 * 用于调试代码，测试是否生效
 */
// import {
//   getClipboardText,
//   getConnectivity,
//   getCookie
// } from '@/src/api/device';
import { debugLog } from '@/common/helper/log';

debugLog(module.id, 'Debug', false, window.isSecureContext);
