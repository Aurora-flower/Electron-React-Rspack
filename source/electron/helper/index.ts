/**
 * @file 模块导入
 * @remarks
 * - `Webpack`：使用 require.context。
 * - `Vite`：使用 import.meta.glob。
 * - `Node.js`：使用 glob 模块。
 * - `手动导入`：适用于模块数量较少的情况。
 */
// export * from '@/electron/helper/modules/app';
// export * from '@/electron/helper/modules/window';
// export * from '@/electron/helper/modules/platform';

// import { debugLog } from '@/common/log';

const modulesContext = require.context('.', true, /\.ts$/);

const modules: { [key: string]: any } = {};

modulesContext.keys().forEach((key: string) => {
  const context =
    modulesContext(key).default || modulesContext(key);
  Object.assign(modules, context);
  // debugLog(
  //   module.id,
  //   'modulesContext',
  //   true,
  //   key,
  //   modulesContext(key)
  // );
});

export default modules;
