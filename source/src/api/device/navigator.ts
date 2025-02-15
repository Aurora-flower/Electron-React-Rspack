/**
 * @file Navigator - Web API 相关
 * @description Navigator 接口代表了用户代理的状态和身份，它允许脚本对其进行查询并注册自身以便执行某些活动。
 */

/**
 * 获取平台信息
 * @description
 * 通过 web api - navigator.userAgent 获取平台信息。
 *
 *
 * 注意📢:
 * navigator.platform 已经被废弃，随着隐私保护政策的增强，浏览器已经不再推荐使用它，因为它可能泄露过多的用户信息。
 */
export function getOS() {
  let os = '';
  if (window.navigator.userAgent.indexOf('Windows NT') > -1) {
    os = 'Windows';
  } else if (
    window.navigator.userAgent.indexOf('Mac OS X') > -1
  ) {
    os = 'MacOS';
  } else if (
    window.navigator.userAgent.indexOf('Android') > -1
  ) {
    os = 'Android';
  } else if (
    window.navigator.userAgent.indexOf('iPhone') > -1 ||
    window.navigator.userAgent.indexOf('iPad') > -1
  ) {
    os = 'iOS';
  } else {
    os = 'Other';
  }

  return os;
}

/**
 * 获取浏览器信息
 * @description
 * 通过 web api - navigator.userAgent 获取浏览器信息。
 */
export function getBrowser() {
  let browser = '';
  if (navigator.userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (navigator.userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (navigator.userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  }
  return browser;
}
