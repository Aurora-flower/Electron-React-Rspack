/**
 * @summary 请求地址
 */
export const ApiURL = {
  // 本地服务
  Local: 'http://localhost:9080',

  // API 测试服务
  Placeholder: 'https://jsonplaceholder.typicode.com',

  // 后台服务 - 工具箱、学习示例
  Fast: '',

  // 音乐、视频、TODO 、旅行记、兼职平台服务
  Music: '',
  Video: '',
  Todo: '',
  Gen: '',
  Voyage: '',
  Job: ''
};

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
