/**
 * @summary 应用进程结构定义
 */
const AppProcess = {
  Main: 'Main',
  Preload: 'Preload',
  Renderer: 'Renderer'
};

/**
 * @summary 构建环境
 */
const BuildingEnvironment = {
  None: 'none',
  Dev: 'development',
  Prod: 'production'
};

module.exports = { AppProcess, BuildingEnvironment };
