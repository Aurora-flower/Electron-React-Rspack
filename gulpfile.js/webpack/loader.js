// C++模块 .node文件处理

/**
 * @summary c++ 模块 - `.node`文件的处理
 */
function getNodeModuleLoader() {
  return {
    test: /\.node$/,
    use: 'node-loader'
    // exclude: /node_modules/,
  };
}

const Loader = {
  getNodeModuleLoader
};

module.exports = Loader;
