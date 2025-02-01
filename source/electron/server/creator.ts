import http from 'node:http';
import express from 'express';
import https from 'node:https';
import { debugLog } from '@/common/log';
import { joinPath } from '@/common/joinPath';
import { handleError } from '@/common/error';

// import Koa from 'koa';
// import serve from 'koa-static';

// export function startServer() {
//   const app = new Koa();

//   const root = './app/public';
//   const opts = {};

//   app.use(serve(root, opts));
//   app.use((ctx, next) => {
//     const start = Date.now();
//     return next().then(() => {
//       const ms = Date.now() - start;
//       console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//     });
//   });

//   app.listen(59080);
// }

interface AppServerOptions {
  isSafe: boolean /* 是否为 https 协议 */;
  hostname: string /* 主机域名 */;
  port: number /* 端口 */;
  path: string /* 静态托管路径 */;
}

/**
 * @class AppServer
 * @description 创建一个本地服务
 */
export class AppServer {
  private _option: AppServerOptions; /* 配置项 */
  private _instance!: AppServer; /* 实例（未使用单例） */
  private _application!: express.Application; /* express 实例 */
  private _server!: http.Server | https.Server; /* 服务实例 */

  constructor(options: AppServerOptions) {
    this._option = options;
    this._application = express();

    /**
     * @description 设置静态文件服务
     * @remarks
     *
     * `express.static()` 的参数：
     *
     * - 路径：
     *
     * 接受的路径应该是绝对路径。
     * 如果提供了相对路径，它将相对于 Node.js 应用程序的当前工作目录。
     *
     * - 选项：
     *
     * 可以接受一个选项对象作为第二个参数，
     * 允许配置缓存行为、索引文件名称等。
     */
    const middleware = express.static(this._option.path); // 中间件函数
    this._application.use(middleware);

    if (options.isSafe) {
      /* https 协议 */
      this.creatorSafeServer();
    } else {
      /* http 协议 */
      this.creatorServer();
    }
    debugLog(module.id, options.path, true);
  }

  getWebUrl() {
    const { isSafe, hostname, port } = this._option;
    const pact = isSafe ? 'https' : 'http';
    return `${pact}://${hostname}:${port}`;
  }

  getStaticPath() {
    return this._option.path;
  }

  getInstance() {
    return this._instance;
  }

  getOption() {
    return this._option;
  }

  creatorServer() {
    if (!this._application) return;
    this._server = http.createServer(this._application);
  }

  creatorSafeServer() {
    if (!this._application) return;
    // const credentials = getCerts();
    // this._server = https.createServer(
    // credentials,
    // this.application
    // );
  }

  /**
   * 启动服务
   */
  async start() {
    /**
     * @summary 添加一个中间件来处理所有未知路由
     * @description 如果请求的 URL 与任何已注册的路由不匹配，则返回 404 错误。
     * 这里主要用于解决本地刷新时，前端路由会匹配到任何路由，导致服务端返回 404 错误的问题。
     * @remarks
     * @param {express.Request} req - 请求对象
     * @param {express.Response} res - 响应对象
     * @param {express.NextFunction} next - 下一个中间件函数
     * @returns {void}
     * 对于 SPA，返回 index.html 文件
     */
    this._application.get('*', (req, res, next) => {
      const indexFilePath = joinPath(
        this._option.path,
        'index.html'
      );
      debugLog(
        module.id,
        'Res',
        true,
        `${req.url}`,
        indexFilePath,
        next
      );
      res.sendFile(indexFilePath);
    });

    this._server.listen(this._option.port, () => {
      debugLog(
        module.id,
        'Server Listen',
        true,
        `Static source - ${this._option.path} - port: ${this._option.port}`
      );
    }); // 监听端口
    this._server.on('error', handleError);
  }
}
