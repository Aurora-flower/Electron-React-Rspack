/**
 * @file 基于 nodejs 的 server 模块
 * @description 用以本地辅助 react 路由实现的使用
 * @see {@link https://www.koajs.net/ Koa 中文文档}
 * @see {@link https://express.nodejs.cn/ Express Node.js 中文文档}
 * @remarks
 * windows - netstat -ano | findstr :9958
 */

import Koa from 'koa';
import serve from 'koa-static';
const app = new Koa();

const root = './app/public';
const opts = {};

app.use(serve(root, opts));
app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

app.listen(59080);
// import net from 'node:net';
// import http from 'node:http';
// import https from 'node:https';
// import { app } from 'electron';
// import { readFileSync } from 'node:fs';
// import { debugLog } from '@/common/log';
