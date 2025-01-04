/**
 * @file  prettier 配置
 * @type {import("prettier").Config}
 * @see {@link https://prettier.io/docs/en/options.html}
 */

module.exports = {
  /* 指定逗号（,）的使用方式 */
  trailingComma: 'none',
  /* 缩进空格数, 定义了一个制表符（Tab）所占用的空格数 */
  tabWidth: 2,
  /* 是否在语句的末尾添加分号 */
  semi: true,
  /* 是否使用单引号作为字符串的引号 */
  singleQuote: true,
  /* 是否在 HTML、Vue 和 JSX 中每行强制执行单个属性 */
  singleAttributePerLine: true,
  /* 是否在唯一的箭头函数参数周围包含括号 */
  arrowParens: 'avoid',
  /* 是否将多行 HTML（JSX、Vue、Angular） 元素的 > 放在最后一行的末尾 */
  bracketSameLine: true,
  /* 是否在 JSX 中使用单引号而不是双引号 */
  jsxSingleQuote: true,
  /* 对象属性的引号类型 -  consistent - 如果一个对象中至少有一个属性需要引号，请引用所有属性 */
  quoteProps: 'consistent',
  /* 是否使用制表符而不是空格缩进 */
  useTabs: false,
  /* 换行符 - LF - mac 换行符 */
  endOfLine: 'lf',
  /* 输出的代码长度限制 */
  printWidth: 65,
  /* 是否在 JSX 中保留空格 */
  // jsxBracketSameLine: true,
  /* 对象中的左右的空格间隔 */
  bracketSpacing: true,
  plugins: [
    // 'prettier-plugin-tailwindcss' // tailwindcss 排序
  ]
};
