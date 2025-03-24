/**
 * @file 辅助模块的加载
 * @description
 * - event 目录下是关于 node 的模块
 * - modules 目录下是关于 Electron 的模块
 */
// import { contextLoad } from '@/common/webpack/load';

// const modulesContext = require.context(
//   './modules',
//   true,
//   /\.ts$/
// );

// export default contextLoad(modulesContext);

export * from '@/electron/helper/modules/app';
export * from '@/electron/helper/modules/window';
export * from '@/electron/helper/modules/process';
export * from '@/electron/helper/modules/platform';
