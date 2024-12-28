const exclude = /node_modules/; /* 排除目录 */

/**
 * @summary webpack Loader
 * @remarks
 *
 * webpack 5 之前，使用 loader:
 * - raw-loader 将文件导入为字符串
 * - url-loader 将文件作为 data URI 内联到 bundle 中
 * - file-loader 将文件发送到输出目录
 *
 * 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
 * 资源模块类型(asset module type):
 * asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
 * asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
 * asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
 * asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
 *
 * Tip: 路径是相对于输出目录的路径
 */
const Loader = {
  // css 文件处理
  css: {
    test: /\.css$/,
    use: [
      /**
       * @summary 由于开启了 CSP 策略，所以需要使用 MiniCssExtractPlugin 提取 css
       * 替换掉 'style-loader'
       */
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
    ]
    // exclude // Tip: 不能排除，对 node_modules 的 css 文件需要处理；
  },

  // js 文件处理
  js: {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: EXCLUDE
  },

  // ts 文件处理
  ts: {
    test: /\.ts$/,
    use: 'ts-loader',
    exclude: EXCLUDE
  },

  // jsx 文件处理
  jsx: {
    test: /\.jsx$/,
    use: [
      {
        loader: 'babel-loader', // 添加 babel-loader 来处理 JSX
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          cacheDirectory: true
        }
      }
    ],
    exclude: EXCLUDE
  },

  // tsx 文件处理
  tsx: {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader', // 添加 babel-loader 来处理 TSX
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          cacheDirectory: true
        }
      },
      'ts-loader'
    ],
    exclude: EXCLUDE
  },

  // 字体处理
  font: {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name]_[hash][ext]'
    }
  },

  // 图像处理
  image: {
    test: /\.(png|jpe?g|gif|webp)$/i,
    parser: {
      // 表示图片小于 8kb 时，使用 base64 编码
      dataUrlCondition: {
        maxSize: 8 * 1024 // 8kb
      }
    },
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]'
    }
    // use: [
    //   {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 8 * 1024, // 小于 8KB 的图片会被转换为 base64 字符串
    //       name: '[name].[hash][ext]', // 输出文件名称
    //       outputPath: 'images/' // 输出文件夹
    //     }
    //   }
    // ]
  },

  // svg 图像处理
  svg: {
    test: /\.svg$/i,
    type: 'asset/inline',
    generator: {
      dataUrl: content => {
        content = content.toString();
        return svgToMiniDataURI(content);
      }
    }
  },

  // 文本文件处理
  text: {
    test: /\.(txt|crt|pem)$/i,
    // Tip: 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
    // type: 'asset'
    type: 'asset/resource',
    generator: {
      filename: 'text/[name][ext]'
    }
  }
};
