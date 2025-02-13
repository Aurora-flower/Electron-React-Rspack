/**
 * @file 执行打包任务，使用 electron-builder
 * @see {@link https://www.electron.build electron-builder 文档}
 * @description 支持多平台打包，通过命令行参数指定平台
 */
const path = require('node:path');
const { task, series } = require('gulp');
const builder = require('electron-builder');
const { getArgv } = require('../utils/argv');
const { buildSeries } = require('./compile');

const CWD = process.cwd();

/**
 * 基础 electron-builder 配置
 * @type {import('electron-builder').Configuration}
 */
const baseConfig = {
  /* 构建资源目录 */
  directories: {
    /* 输出目录 --- 默认 build */
    output: 'release/${version}',

    /* 应用程序目录 --- 构建中间文件目录 */
    app: 'app'
  },

  /* 包含文件与目录 */
  files: [],

  /* 启用 asar 打包 */
  asar: true,

  /* 应用程序名称 */
  productName: '花楹一间',

  /* 应用程序标识符 - ID */
  appId: 'website.huaying.electron-app',

  /* macOS 构建配置 */
  mac: {
    target: 'dmg',
    icon: 'build/icon.icns'
  },

  /* windows 构建配置 */
  win: {
    target: 'nsis',
    icon: 'public/favicon.ico'
  },

  /* linux 构建配置 */
  linux: {
    target: 'AppImage',
    maintainer: 'your@email.com'
  }
};

async function package() {
  console.log('Packageing...');
  // await rimraf([path.join(CWD, 'app'), path.join(CWD, 'dist')]);

  // 获取命令行参数
  const argv = getArgv();

  // 解析平台参数（支持逗号分隔多平台）
  const platforms = (argv.platform || process.platform)
    .split(',')
    .map(platform => {
      switch (platform.trim().toLowerCase()) {
        case 'mac':
        case 'darwin':
          return builder.Platform.MAC;
        case 'win':
        case 'win32':
          return builder.Platform.WINDOWS;
        case 'linux':
          return builder.Platform.LINUX;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    });

  try {
    console.log(
      `Building for platforms: ${platforms.join(', ')}`
    );

    // 执行构建
    const result = await builder.build({
      targets: builder.createTargets(platforms, null, 'all'), // 构建所有架构
      config: {
        ...baseConfig,
        ...(argv.config
          ? require(path.join(CWD, argv.config))
          : {}) // 支持自定义配置文件
      }
    });

    console.log(
      'Build results:\n',
      JSON.stringify(result, null, 2)
    );
    console.log(
      '✅ Package successfully created in dist/ directory'
    );
  } catch (error) {
    console.error('‼️ Build failed with error:\n', error);
    throw error; // 抛出错误使Gulp任务失败
  }
}

task('package', series(buildSeries, package));
