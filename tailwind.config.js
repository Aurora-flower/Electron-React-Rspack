/**
 * @file tailwindcss 配置文件
 * @type {import('tailwindcss').Config}
 * @see {@link https://www.tailwindcss.cn tailwindcss 中文文档}
 * */
module.exports = {
  content: ['./source/src/**/*.{html,js,ts,jsx,tsx,css}'],
  theme: {
    extend: {}
  },
  // corePlugins: {
  //   /* 如果不需要默认样式重置可以禁用 preflight */
  //   preflight: false
  // },
  plugins: []
  // safelist: ['app-region']
};
