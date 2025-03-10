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

// function debug() {
//   const file = new File(['hello'], 'test.txt');

//   // 创建 FileReader 对象
//   const reader = new FileReader();

//   // 当文件读取完成时执行
//   reader.onload = function (e) {
//     const arrayBuffer = e.target?.result; // 获取 ArrayBuffer

//     if (arrayBuffer) {
//       // 将 ArrayBuffer 转为 Data URL，用于显示图片
//       const blob = new Blob([arrayBuffer]);
//       const url = URL.createObjectURL(blob);
//       console.log('debug', e, arrayBuffer, url);
//     }
//   };

//   // 读取文件为 ArrayBuffer
//   reader.readAsArrayBuffer(file);
// }

// debug();

debugLog(
  {
    id: module.id,
    sign: 'Debug'
  },
  window.isSecureContext
);
