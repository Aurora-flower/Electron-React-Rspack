/**
 * @file 执行打包任务
 * @see {@link https://www.electron.build electron-builder 文档}
 * @description
 * 1. 清理本地的 app | release 文件夹
 * 2. 开始 compile
 * 3. 复制处理 package.json 文件到 app 目录
 * 4. electron-builder 打包构建 （自调用 build/after-pack.js)
 */
// 'use strict';

const { task } = require('gulp');
// const builder = require('electron-builder');

const CWD = process.cwd(); /* 当前工作目录  */

// const Platform = builder.Platform;

// // Let's get that intellisense working
// /**
//  * @type {import('electron-builder').Configuration}
//  * @see {@link https://www.electron.build/configuration}
//  */
// // const options = {
// //   protocols: {
// //     name: 'Deeplink Example',
// // Don't forget to set `MimeType: "x-scheme-handler/deeplink"`
// // for `linux.desktop` entry!
// //     schemes: ['deeplink']
// //   },

// // "store” | “normal” | "maximum". - For testing builds,
// // use 'store' to reduce build time significantly.
// //   compression: 'normal',
// //   removePackageScripts: true,

// //   afterSign: async context => {
// // Mac releases require hardening+notarization:
// // https://developer.apple.com/documentation/xcode/
// // notarizing_macos_software_before_distribution
// //     if (!isDebug && context.electronPlatformName === 'darwin') {
// //       await notarizeMac(context);
// //     }
// //   },
// //   artifactBuildStarted: context => {
// //     identifyLinuxPackage(context);
// //   },
// //   afterAllArtifactBuild: buildResult => {
// //     return stampArtifacts(buildResult);
// //   },
// //   // force arch build if using electron-rebuild
// //   beforeBuild: async context => {
// //     const { appDir, electronVersion, arch } = context;
// //     await electronRebuild.rebuild({
// //       buildPath: appDir,
// //       electronVersion,
// //       arch
// //     });
// //     return false;
// //   },
// //   nodeGypRebuild: false,
// //   buildDependenciesFromSource: false,

// //   directories: {
// //     output: 'dist/artifacts/local',
// //     buildResources: 'installer/resources'
// //   },
// //   files: ['out'],
// //   extraFiles: [
// //     {
// //       from: 'build/Release',
// //       to: nodeAddonDir,
// //       filter: '*.node'
// //     }
// //   ],

// //   win: {
// //     target: 'nsis'
// //   },
// //   nsis: {
// //     deleteAppDataOnUninstall: true,
// //     include: 'installer/win/nsis-installer.nsh'
// //   },

// //   mac: {
// //     target: 'dmg',
// //     hardenedRuntime: true,
// //     gatekeeperAssess: true,
// //     extendInfo: {
// //       NSAppleEventsUsageDescription: 'Let me use Apple Events.',
// //       NSCameraUsageDescription: 'Let me use the camera.',
// //       NSScreenCaptureDescription: 'Let me take screenshots.'
// //     }
// //   },
// //   dmg: {
// //     background: 'installer/mac/dmg-background.png',
// //     iconSize: 100,
// //     contents: [
// //       {
// //         x: 255,
// //         y: 85,
// //         type: 'file'
// //       },
// //       {
// //         x: 253,
// //         y: 325,
// //         type: 'link',
// //         path: '/Applications'
// //       }
// //     ],
// //     window: {
// //       width: 500,
// //       height: 500
// //     }
// //   },

// //   linux: {
// //     desktop: {
// //       StartupNotify: 'false',
// //       Encoding: 'UTF-8',
// //       MimeType: 'x-scheme-handler/deeplink'
// //     },
// //     target: ['AppImage', 'rpm', 'deb', 'pacman']
// //   },
// //   deb: {
// //     priority: 'optional',
// //     afterInstall: 'installer/linux/after-install.tpl'
// //   },
// //   rpm: {
// //     fpm: [
// //       '--before-install',
// //       'installer/linux/before-install.tpl'
// //     ],
// //     afterInstall: 'installer/linux/after-install.tpl'
// //   }
// // };

// // Promise is returned
// builder
//   .build({
//     targets: Platform.MAC.createTarget(),
//     config: options
//   })
//   .then(result => {
//     console.log(JSON.stringify(result));
//   })
//   .catch(error => {
//     console.error(error);
//   });

task('package', function (done) {
  console.log('开始打包...', CWD);

  done();
});
