/**
 * @file AJAX (Asynchronous JavaScript And XML)
 * @description
 * Ajax 允许通过与场景后面的 Web 服务器交换数据来异步更新网页。这意味着可以更新网页的部分，而不需要重新加载整个页面。
 *
 *
 * @remarks
 * - 浏览器内建的 XMLHttpRequest 对象（从 web 服务器请求数据） +  JavaScript 和 HTML DOM（显示或使用数据）
 *
 * Tip:
 * Ajax 是一个令人误导的名称。Ajax 应用程序可能使用 XML 来传输数据，但将数据作为纯文本或 JSON 文本传输也同样常见。
 */

function checkXHRSupport() {
  return typeof window?.XMLHttpRequest !== 'undefined';
}

/**
 * 创建 XMLHttpRequest 对象
 * @description
 * - Ajax 的核心是 XMLHttpRequest 对象。
 * - 所有现代浏览器都支持 XMLHttpRequest 对象。
 * - XMLHttpRequest 对象用于同幕后服务器交换数据。这意味着可以更新网页的部分，而不需要重新加载整个页面。
 * @remarks
 * - 浏览器兼容问题：

 *    - 所有现代浏览器（Chrom、IE7+、Firefox、Safari 以及 Opera）都有内建的 XMLHttpRequest 对象。
 *    - 老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象:
 *
 * - XMLHttpRequest 对象的 readyState 属性始终会改变。
 * 
 * 
 * - XMLHttpRequest 对象的方法：
 *    - `abort()`: 取消当前请求
 *    - `getAllResponseHeaders()`: 返回所有响应头（头部信息）
 *    - `open(method, url, async, user, psw)`: 
 * 
 *       - method：请求的类型，GET 或 POST
 *       - url：文件在服务器上的位置
 *       - async：true（异步）或 false（同步）
 *       - user：用户名，可选
 *       - psw：密码，可选
 *
 *    - `send()`: 向服务器发送请求 (GET)
 *    - `send(string)`：向服务器发送请求 (POST)
 *    - `setRequestHeader(header, value)`: 设置请求头（报头：标签 / 值)
 * 
 * - XMLHttpRequest 对象的属性：
 *   - `readyState`: 保存 XHR 的状态 (0 ~ 4)
 *      - 0: 请求未初始化
 *      - 1: 服务器连接已建立
 *      - 2: 请求已接收
 *      - 3: 请求处理中
 *      - 4: 请求已完成，且响应已就绪
 *  - `status`: 服务器响应的 HTTP 状态码
 *  - `onreadystatechange`: 当 readyState 改变时被调用的函数
 *  - `responseText`: 从服务器接收的文本(以字符串返回响应数据)
 *  - `responseXML`: 从服务器接收的 XML 文档(以 XML DOM 对象返回响应数据)
 *  - `statusText`: 状态的文本 (例如 "OK" | "Not Found")
 */
function getXHR() {
  if (checkXHRSupport()) {
    return new XMLHttpRequest(); // xhttp
  } else {
    // ActiveXObject 是 IE 旧版特有API
    return new window.ActiveXObject('Microsoft.XMLHTTP');
  }
}

export function loadResource(url, isAsync = false) {
  const xhttp = getXHR();
  xhttp.onreadystatechange = function () {
    // 4: 请求已完成 | 200: "OK"
    if (this.readyState === 4 && this.status === 200) {
      // console.log(this.responseText);
    }
  };
  xhttp.open('GET', url, isAsync);
  // xhttp.setRequestHeader(
  //   'Content-type',
  //   'application/x-www-form-urlencoded'
  // );
  xhttp.send();
}
