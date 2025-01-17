/**
 * @file axios 请求的封装
 * @description
 * Axios 是一个基于 promise 网络请求库，作用于 node.js 和浏览器中。
 * 它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。
 * 在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。
 * @see
 */

/**
 * @import axios
 * @description 模块打包器无法自动解析时，使用 require 预构建模块
 * const axios = require('axios/dist/browser/axios.cjs'); // browser
 * const axios = require('axios/dist/node/axios.cjs'); // node
 */

/**
 * @summary 请求拦截器 interceptors.request
 */

/**
 * @summary 响应拦截器 interceptors.response
 */

class Service {}

export default Service;
