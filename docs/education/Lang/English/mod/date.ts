/**
 * @file 英文 - 日期相关
 * @description
 * 日期常用写法:
 * - `June 6, 2023` -	美式英语
 * - `6 June, 2023` -	英式英语
 *
 * 在表达日期时，很多时候也会加上「st / nd / rd／th」来表示序数 (例如：June 6th)：
 * - `-st`
 * 如：`1st, 21st, 31st` - 除了11外，个位数为1的日子
 * - `-nd`
 * 如：`2nd, 22nd` - 除了12外，个位数为2的日子
 * - `-rd`
 * 如：`3rd, 23rd` - 除了13外，个位数为3的日子
 * - `-th`
 * 如：`4th, 11th, 12th, 28th` - 除了以上三种以外皆是以th结尾
 */

/**
 * @summary 月份
 * @description
 * - 月份的英文是 month, 复数为 months
 * - 每月表示为 `monthly`
 *
 * 在英语书面表达中，例如在 email 或行事历中，常用缩写表示。
 * 在口语表达中，缩写也常被使用，特别在提及具体日期时。
 */
const Month = {
  /* Jan */
  1: "January",
  /* Feb */
  2: "February",
  /* Mar */
  3: "March",
  /* Apr */
  4: "April",
  /* May */
  5: "May",
  /* Jun */
  6: "June",
  /* Jul */
  7: "July",
  /* Aug */
  8: "August",
  /* Sep | Sept */
  9: "September",
  /* Oct */
  10: "October",
  /* Nov */
  11: "November",
  /* Dec */
  12: "December",
};

/**
 * @summary 星期
 * @description
 * - 星期一到星期五的工作日称为 `weekdays`
 * - 周末称为 `weekend`
 * - 一周为 `week`
 * - 每周表示为 `weekly`
 */
const Week = {
  /* Mon */
  1: "Monday",
  /* Tue */
  2: "Tuesday",
  /* Wed */
  3: "Wednesday",
  /* Thu | Thur */
  4: "Thursday",
  /* Fri */
  5: "Friday",
  /* Sat */
  6: "Saturday",
  /* Sun */
  7: "Sunday",
};

export { Month, Week };
