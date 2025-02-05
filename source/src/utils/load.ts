/**
 * @file 使用 require.context 批量导入文件
 *
 * require.context 是 webpack 提供的一个功能，用于批量导入指定目录下的文件。
 * 由 webpack-env 提供的 require.context 方法实现。
 * webpack-env 用于在运行时动态加载模块。
 */
// function loadResource(url: string, type: string = 'image') {
//   // 测试
//   const glob = require.context(
//     'xxx',
//     true,
//     /\.ts$/
//   );
//   glob.keys().forEach(element => {
//     console.log(glob(element).default);
//   });
//   console.log(glob.keys());
// }

// export default loadResource;
