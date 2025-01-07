const {
  AppProcess,
  BuildingEnvironment
} = require('./constant');
const {
  getDotenvPlugin,
  getHtmlWebpackPlugin,
  getCopyWebpackPlugin,
  getMiniCssExtractPlugin
} = require('./plugins');
const { Loader } = require('./loader');
const { Devtool } = require('./devtool');
const joinPath = require('../utils/joinpath');
const { WebpakTarget } = require('./webpack-target');

/**
 * @summary 获取当前工作目录
 */
const CWD = process.cwd();

/**
 * @summary 定义输入、输出目录与文件路径
 */
const FolderPath = new Proxy(
  {
    /* 打包输出位置 */
    App: 'app',

    /* 静态文件目录 */
    Public: 'public',

    /* 类型声明文件目录 */
    Types: 'types',

    /* 源文件目录 */
    Source: 'source',

    /* 配置文件目录 */
    Config: '.config',

    /* 主进程、预加载进程、渲染进程代码存放位置 */
    Main: 'electron',
    Preload: 'preload',
    Renderer: 'public', // renderer | Dist

    /* 模板 html 存放位置 */
    Static: 'index.html'
  },
  {
    get(target, key) {
      const flag = key in target;
      if (!flag) return undefined;
      if (
        [
          AppProcess.Main,
          AppProcess.Preload,
          AppProcess.Renderer
        ].includes(key)
      ) {
        return joinPath(CWD, target.App, target[key]);
      }

      if (['Static'].includes(key)) {
        return {
          page: joinPath(
            CWD,
            target.App,
            target.Renderer,
            target[key]
          )
        };
      }

      const folder = joinPath(CWD, target[key]);
      if ('Source' == key) {
        return {
          base: folder,
          electron: joinPath(folder, 'electron'),
          preload: joinPath(folder, 'preload'),
          server: joinPath(folder, 'server'),
          renderer: joinPath(folder, 'src')
        };
      }
      if ('Public' == key) {
        const assets = joinPath(folder, 'assets');
        return {
          base: folder,
          assets,
          fonts: joinPath(assets, 'fonts'),
          atlas: joinPath(folder, 'atlas'),
          images: joinPath(assets, 'images'),
          styles: joinPath(folder, 'styles')
        };
      }
      return folder;
    }
  }
);

const FilePath = new Proxy(
  {
    Env: '.env',
    Page: 'index.html',
    Favicon: 'favicon.ico'
  },
  {
    get(target, key) {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return undefined;
      }
      if ('Env' == key) {
        return {
          base: joinPath(FolderPath.Config, target[key]),
          private: joinPath(FolderPath.Config, '.private.env')
        };
      }
      return joinPath(FolderPath.Public.base, target[key]);
    }
  }
);

/**
 * @summary 构建入口
 */
const Entry = {
  Main: {
    main: joinPath(FolderPath.Source.electron, 'index.ts')
  },
  Preload: {
    index: joinPath(FolderPath.Source.preload, 'index.ts')
  },
  Renderer: {
    index: joinPath(FolderPath.Source.renderer, 'index.ts'),
    vendor: joinPath(FolderPath.Source.renderer, 'vendor.ts')
  }
};

/**
 * @summary Webpack 别名
 */
const alias = {
  '@': FolderPath.Source.base,
  '@type': FolderPath.Types
};

/**
 * @summary Webpack 优化配置
 * @see {@link https://www.webpackjs.com/configuration/optimization/}
 */
const optimization = {
  // runtimeChunk: 'single',
  // splitChunks: {
  //   chunks: 'all',
  //   maxInitialRequests: Infinity,
  //   minSize: 0,
  //   cacheGroups: {
  //     vendors: {
  //       test: /[\\/]node_modules[\\/]/,
  //       name: 'vendors',
  //       chunks: 'all'
  //     }
  //   }
  // }
  /* 压缩代码 */
  minimize: true
};

/**
 * @summary 配置外部依赖
 * 表示排除的依赖项，指定的依赖不会被打包, node 模块默认不会被打包；
 */
const externals = {
  // electron: 'commonjs2 electron'
  // canvas: 'commonjs2 canvas'
};

/**
 * @summary 获取 Webpack 构建配置
 * @param {BuildingEnvironment} mode 构建环境
 */
function get(mode = BuildingEnvironment.Dev) {
  const baseExtensions = ['.js', '.ts', '.json'];
  const baseLoader = [Loader.js, Loader.ts];
  const basePlugins = [getDotenvPlugin(FilePath.Env.base)];
  const Config = Object.values(AppProcess).map(name => {
    const isRenderer = name === AppProcess.Renderer;
    const options = {
      mode:
        mode || process.env?.NODE_ENV || BuildingEnvironment.Dev,
      target: WebpakTarget[name],
      stats: {
        errorDetails: true
      },
      entry: Entry[name],
      output: {
        path: FolderPath[name], // 输出目录
        filename: '[name].js', // '[name].[contenthash].js'
        clean: true
      },
      devtool: Devtool.NosourcesSourceMap,
      resolve: {
        // mainFields: ['browser', 'module', 'main'],
        extensions: baseExtensions,
        alias
      },
      externals,
      module: {
        rules: baseLoader
      },
      optimization,
      plugins: basePlugins
    };

    if (isRenderer) {
      /* 注意📢：对主进程、预加载进程可能有影响；当启用路由时，需要设置 publicPath */
      options.output.publicPath = '/';
      options.resolve.extensions = baseExtensions.concat([
        '.jsx',
        '.tsx'
      ]);
      options.module.rules = baseLoader.concat(Loader.css);
      options.plugins.push(
        getCopyWebpackPlugin([
          {
            from: FolderPath.Public.base,
            toType: 'dir',
            to: FolderPath.Renderer
            // force: false
          }
        ]),
        getHtmlWebpackPlugin({
          template: FilePath.Page,
          filename: FolderPath.Static.page
        }),
        getMiniCssExtractPlugin()
      );
    }

    return options;
  });

  return Config;
}

module.exports = get;
