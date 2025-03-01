/**
 * @file 获取端口和 web 地址
 */
import net from 'node:net';

export const DefaultHost = '127.0.0.1'; /* 默认地址 */
export const DefaultPort = 59080; /* 默认端口 */

/**
 * 获取端口
 * @returns {number}
 */
export function getPort(): number {
  const AppServerPort = Number(process.env?.APP_SERVER_PORT); // 定义服务器端口
  return isNaN(AppServerPort) ? DefaultPort : AppServerPort;
}

/**
 * 获取 web 地址
 * @returns {string}
 */
export function getHostname(): string {
  const AppServerHostname = process.env?.APP_SERVER_HOSTNAME; // 定义服务器地址
  return AppServerHostname || DefaultHost;
}

/**
 * 获取 web 地址
 * @param {boolean} isSafe 是否为 https 安全协议
 * @returns {string}
 */
export function getWebUrl(isSafe: boolean = false): string {
  return (
    (isSafe
      ? process.env?.WEB_SAFE_URL
      : process.env?.WEB_URL) ||
    `http://${getHostname()}:${getPort()}`
  );
}

/**
 * 检查端口是否被占用
 * @param {string} webUrl 访问地址
 * @param {number} port 端口
 * @returns 是否被占用
 * @description
 * - 如果连接成功，说明端口被占用;
 * - 如果连接失败，说明端口未被占用;
 * @remarks
 * 1. `net.createServer()` 方法用于创建一个 TCP 服务器。它接受一个可选的对象参数 `options` 和一个可选的回调函数 `connectionListener。`
 *
 * - 参数:
 *
 *    - `options`: 可选对象，可以包含一些服务器选项，如监听地址和端口。
 *
 *    - `connectionListener`: 可选的回调函数，当有新的连接建立时会被调用。
 *
 * - 返回值: 返回一个 `net.Server` 对象，该对象代表了一个 TCP 服务器。当新的连接建立时，会触发 'connection' 事件。
 *
 * 2. `net.connect()` 方法用于创建一个 TCP 客户端连接。它接受一个 `options` 对象或者一个 `path` 字符串作为参数，并返回一个 `net.Socket` 对象。
 *
 * - 参数:
 *
 *    - `options`: 对象形式，可以包含连接的地址、端口等信息。
 *
 *    - `path`: 字符串形式，通常用于 Unix 域套接字。
 *
 * - 返回值: 返回一个 `net.Socket` 对象，该对象代表了一个 TCP 客户端连接。
 */
export function checkConnection(
  webUrl: string,
  port: number = DefaultPort
): Promise<boolean> {
  return new Promise(resolve => {
    const socket = net.connect({ port, host: webUrl }, () => {
      socket.destroy(); // 关闭连接
      resolve(true); //
    });
    socket.on('error', (err: any) => {
      const expectCodeList = [
        /* 表示找不到主机 */
        'ENOTFOUND',
        /* 表示连接被拒绝 */
        'ECONNREFUSED'
      ];
      if (expectCodeList.includes(err.code)) {
        resolve(false);
      } else if (err.code === 'ECONNRESET') {
        // [
        //   /* 表示地址被占用 */
        //   'EADDRINUSE',
        //   /* 表示连接被重置 */
        //   'ECONNRESET'
        // ]
        resolve(true);
      }
    });
  });
}
