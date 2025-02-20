/**
 * @file vendor 第三方库或编译资源的引入
 */
import '@/src/debug';
import { debugLog } from '@/common/helper/log';

/**
 * @import animate.css 动画库
 * @description 用于简化渲染进程的动画实现
 * @see {@link https://animate.style/ animate.css 官网}
 * @remarks
 */
// import 'animate.css';

debugLog({
  id: module.id,
  sign: 'Vendor'
});
