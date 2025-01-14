/**
 * @file 存放代理配置，用于开发环境中的跨域请求代理配置
 */

import { ApiURL } from '@/src/config/server';

/**
 * @summary 代理配置
 */
export const ProxyConfig = {
  '/api': {
    target: ApiURL.Local,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  },
  '/fast': {
    target: ApiURL.Fast,
    changeOrigin: true,
    pathRewrite: {
      '^/fast': ''
    }
  }
};
