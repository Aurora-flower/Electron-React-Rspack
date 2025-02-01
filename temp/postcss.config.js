/* eslint-disable max-len */
/**
 * @file postcss.config.js
 * @description postcss配置文件
 * @see {@link https://tailwindcss.com/docs TailwindCSS 文档}
 * @see {@link https://github.com/postcss/postcss postcss Github开源}
 * @see {@link https://github.com/postcss/autoprefixer autoprefixer Github开源}
 * @see {@link https://www.tailwindcss.cn/docs/v4-beta#installing-with-post-css TailwindCSS v4.0.0 官方文档}
 */

// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss'),
//     require('autoprefixer')
//   ]
// };

module.exports = {
  plugins: {
    // tailwindcss: {
    //   config: './.config/tailwind.config.js'
    // },
    // autoprefixer: {}
    '@tailwindcss/postcss': {
      config: './.config/tailwind.config.js'
    }
  }
};
