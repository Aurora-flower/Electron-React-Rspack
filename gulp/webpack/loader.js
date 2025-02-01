const { AssetType } = require('./constant');
// const svgToMiniDataURI = require('mini-svg-data-uri');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const exclude = /node_modules/; /* 排除目录 */

/**
 * @summary 处理 css 文件的 Loader 配置
 */
const css = {
  test: /\.css$/,
  use: [
    /**
     * @summary 由于开启了 CSP 策略，所以需要使用 MiniCssExtractPlugin 提取 css
     * 替换掉 'style-loader'
     * @see https://github.com/webpack-contrib/mini-css-extract-plugin
     */
    MiniCssExtractPlugin.loader,

    /*
     * @summary style-loader 处理 css 文件
     * @see https://github.com/webpack-contrib/style-loader
     */
    // {
    //   loader: 'style-loader'
    // },

    /**
     * @summary css-loader 处理 css 文件
     * @see https://github.com/webpack-contrib/css-loader
     */
    {
      loader: 'css-loader',
      options: {
        /**
         * @summary 启用 CSS 模块功能
         * @description 启用 CSS 模块功能后，类名会自动加上哈希值，防止类名冲突。
         * CSS 模块是一种将 CSS 样式限制在局部作用域的方法，避免全局命名冲突。通过启用 modules，每个 CSS 类名都会被自动转换为唯一的标识符。
         * Tip: 此处开启会影响到 animate.css 的动画效果
         */
        // modules: {
        //   localIdentName: '[name]__[local]__[hash:base64:5]'
        // }
      }
    },

    /*
     * @summary postcss-loader 处理 css 文件
     * @see https://github.com/postcss/postcss-loader
     */
    {
      loader: 'postcss-loader'
      // 注意📢: 可以单独配置文件
      // options: {
      //   postcssOptions: {
      //     plugins: [
      //       /**
      //        * @summary tailwindcss 插件 - '@tailwindcss/postcss'
      //        * @see https://tailwindcss.com/docs/installation
      //        */
      //       '@tailwindcss/postcss',
      //       /**
      //        * @summary autoprefixer 插件
      //        * @see https://github.com/postcss/autoprefixer
      //        */
      //       'autoprefixer'
      //     ]
      //   }
      // }
    }
  ]
  // exclude // 注意📢: 不能排除，对 node_modules 的 css 文件需要处理；
};

/**
 * @summary 处理 Js | Jsx | Ts | Tsx 文件的 Loader 配置
 */
const jsParser =
  /*
   * @summary babel-loader 处理 js | jsx 文件
   * @see https://github.com/babel/babel-loader
   */
  {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ] /* 预设 - 用于处理 react 文件 */,
      cacheDirectory: true,
      cacheCompression: false,
      compact: false
    }
  };

const tsParser =
  /*
   * @summary ts-loader 处理 ts | tsx 文件
   * @see https://github.com/TypeStrong/ts-loader
   */
  {
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  };

/**
 * @summary 处理字体文件的 Loader 配置
 */
const font = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  type: AssetType.Resource,
  generator: {
    filename: 'fonts/[name].[contenthash][ext]'
  },
  exclude
};

/**
 * @summary 处理图像文件的 Loader 配置
 */
const image = {
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  type: AssetType.Resource,
  parser: {
    // 表示图片小于 8kb 时，使用 base64 编码
    dataUrlCondition: {
      maxSize: 8 * 1024 // 8kb
    }
  },
  generator: {
    filename: 'images/[name].[contenthash][ext]'
  },
  exclude

  // svg 图像处理
  // {
  //   test: /\.svg$/i,
  //   type: 'asset/inline',
  //   generator: {
  //     dataUrl: content => {
  //       content = content.toString();
  //       return svgToMiniDataURI(content);
  //     }
  //   }
  // }
};

/**
 * @summary 处理文本文件的 Loader 配置
 */
const text = {
  test: /\.(txt|md)$/,
  type: AssetType.Resource,
  generator: {
    filename: 'text/[name].[contenthash][ext]'
  },
  exclude
};

/**
 * @summary 处理 json 文件的 Loader 配置
 */
const json = {
  test: /\.json$/,
  type: AssetType.Resource,
  generator: {
    filename: 'json/[name].[contenthash][ext]'
  },
  exclude
};

/**
 * @summary webpack Loader
 * 注意📢: 路径是相对于输出目录的路径
 */
const Loader = {
  /* Css 文件处理 */
  css,

  /* Json 文件处理 */
  json,

  /* Js | Jsx | Ts | Tsx 文件处理 */
  js: {
    test: /\.(js|jsx)$/,
    use: [jsParser],
    exclude
  },
  ts: {
    test: /\.(ts|tsx)$/,
    use: [jsParser, tsParser],
    exclude
  },

  /* 字体文件处理 */
  font,

  /* 图像文件处理 */
  image,

  /* 文本文件处理 */
  text
};

module.exports = { Loader };
