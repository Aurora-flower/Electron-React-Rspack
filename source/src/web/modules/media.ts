/**
 * @file 媒体查询相关
 */

/**
 * @summary 监听媒体查询
 * @param query 媒体查询
 */
export function matchMedia(query: string) {
  return window.matchMedia(query); //.matches;
}

/**
 * @summary 获取媒体查询结果
 * @param media 媒体查询
 */
export function getMatchDedia(media: MediaQueryList) {
  return media.matches;
}
