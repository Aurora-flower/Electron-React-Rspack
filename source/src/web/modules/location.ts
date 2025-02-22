/**
 * @file Location - Web API 相关
 * @description
 * - Window.location 只读属性返回一个 Location 对象，其中包含有关文档当前位置的信息。
 */

/**
 * 获取当前页面的 URL
 * @returns 当前页面的 URL
 */
export function getLocation() {
  return window.location;
}
