/**
 * @file 存放与设备相关的 web api
 */
export * from '@/src/api/web/device/navigator';

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
