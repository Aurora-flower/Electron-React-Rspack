/**
 * @file 暴露模块
 * @description
 * 通过 `declare module '*.pem'` 告诉 TypeScript 编译器此类型的文件是一个模块，
 * 并且告诉 TypeScript 编译器，这个模块导出一个默认的属性，这个属性是一个字符串。
 * 解决 `Cannot find module '*.pem' or its corresponding type declarations.` 错误
 */
declare module '*.pem';
