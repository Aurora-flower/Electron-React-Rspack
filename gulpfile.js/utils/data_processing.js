/**
 * @file 用于数据处理的函数
 */

/**
 * @summary 首字母大写
 * @param {String} letter 字符信息
 * @returns {string}
 */
function firstLetterUppercase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * @summary 首字母小写
 * @param {String} letter 字符信息
 * @returns {string}
 */
function firstLetterLowercase(letter) {
  return letter[0].toLowerCase() + letter.slice(1);
}

module.exports = {
  firstLetterUppercase,
  firstLetterLowercase
};
