/**
 * @file 模块导入
 * @remarks
 * - `Webpack`：使用 require.context。
 * - `Vite`：使用 import.meta.glob。
 * - `Node.js`：使用 glob 模块。
 * - `手动导入`：适用于模块数量较少的情况。
 */

import { contextLoad } from '@/common/helper/load';

const modulesContext = require.context('.', true, /\.ts$/);

export default contextLoad(modulesContext);
