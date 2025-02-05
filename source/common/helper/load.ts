/**
 * @file 使用 require.context 批量导入文件
 *
 * require.context 是 webpack 提供的一个功能，用于批量导入指定目录下的文件。
 * 由 webpack-env 提供的 require.context 方法实现。
 * webpack-env 用于在运行时动态加载模块。
 */
// import { debugLog } from '@/common/helper/log';

/**
 * 获取模块集合
 * @param modulesContext 模块加载上下文环境
 * @returns {*}
 */
export function contextLoad(
  modulesContext: __WebpackModuleApi.RequireContext
): any {
  const modules: { [key: string]: any } = {};

  if (Array.isArray(modulesContext.keys())) {
    modulesContext.keys().forEach((key: string) => {
      const context =
        modulesContext(key).default || modulesContext(key);
      Object.assign(modules, context);
    });
  }

  return modules;
}
