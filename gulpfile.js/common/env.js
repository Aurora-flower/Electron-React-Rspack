/**
 * @summary 构建环境
 * @description
 * - `none`: 不进行构建
 * - `development`: 开发环境
 * - `production`: 生产环境
 */
const BuildingEnvironment = {
  None: 'none',
  Dev: 'development',
  Prod: 'production'
};

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = [
  'chrome >= 87',
  'edge >= 88',
  'firefox >= 78',
  'safari >= 14'
];

module.exports = { BuildingEnvironment, targets };
