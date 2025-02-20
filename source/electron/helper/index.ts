/**
 * @file 辅助模块的加载
 */

import { contextLoad } from '@/common/helper/load';

const modulesContext = require.context(
  './modules',
  true,
  /\.ts$/
);

export default contextLoad(modulesContext);
