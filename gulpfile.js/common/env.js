/**
 * @summary 构建环境 (Building Environment)
 * @description
 * - `none`: 不进行构建
 * - `development`: 开发环境
 * - `production`: 生产环境
 */
const ENVIRONMENT = {
  /* 不进行构建 */
  None: 'none',

  /* 开发环境 */
  Dev: 'development',

  /* 生产环境 */
  Prod: 'production'
};

// Target browsers, see: https://github.com/browserslist/browserslist
// const targets = [
//   'chrome >= 87',
//   'edge >= 88',
//   'firefox >= 78',
//   'safari >= 14'
// ];

module.exports = ENVIRONMENT;
