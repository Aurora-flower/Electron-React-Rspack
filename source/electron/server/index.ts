/**
 * @file 基于 nodejs 的 server 模块
 * @description 用以本地辅助 react 路由实现的使用
 * @see {@link https://www.koajs.net/ Koa 中文文档}
 * @see {@link https://express.nodejs.cn/ Express Node.js 中文文档}
 * @remarks
 * 检测端口：
 * - `Mac`: lsof -i:59080
 * - `Windows`: netstat -ano | findstr 59080
 */
import {
  getPort,
  checkConnection,
  getWebUrl,
  getHostname
} from '@/electron/server/helper';
import { getAppAsarOutput } from '@/electron/helper';
import debugLog from '@/electron/tools/log';
import { AppServer } from '@/electron/server/creator';

export async function startServer(isSafe: boolean = false) {
  const port = getPort();
  const webUrl = getWebUrl(isSafe);

  /* 检查是否有端口冲突 */
  const connect = await checkConnection(webUrl, port);
  if (connect) {
    // TODO: 端口冲突的处理
    return;
  }
  const server = new AppServer({
    isSafe: false,
    hostname: getHostname(),
    port: getPort(),
    path: getAppAsarOutput('public')
  });
  await server.start();
  debugLog(
    {
      id: module.id,
      sign: 'Start Server'
    },
    connect,
    isSafe
  );
}
