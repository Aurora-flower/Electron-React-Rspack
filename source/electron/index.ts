/**
 * @file 主进程文件主入口
 * @see {@link https://www.electronjs.org/zh/docs/latest/ Electron 官方中文文档}
 * @description
 * Electron 目前只支持三个平台:
 * - Windows
 * - macOS
 * - Linux
 */
import { app } from 'electron';
import { onAppEventListeners } from '@/electron/handler/event';

/* 忽略证书相关错误 -- 自签名的 CA 不会被浏览认可 */
app.commandLine.appendSwitch('ignore-certificate-errors');

onAppEventListeners();
