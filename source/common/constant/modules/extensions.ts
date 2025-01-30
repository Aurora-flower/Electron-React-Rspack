/**
 * @summary 文件后缀的类别区分
 * @description 当需要分类处理文件时，用于根据文件后缀区分文件类型，并进行对应的处理
 */
export const category = {
  /* 图片 */
  image: [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.ico'
  ],

  /* 视频 */
  video: ['.mp4', '.mov'],

  /* 音频 */
  audio: ['.mp3'],

  /* 脚本文件 */
  script: [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
    '.json5',
    '.yaml',
    '.php',
    '.py',
    '.sh',
    '.bat',
    '.css',
    '.html',
    '.xml'
  ]
};
