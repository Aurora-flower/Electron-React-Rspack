import { join } from 'node:path';
import debugLog from '@/electron/tools/log';

/**
 * 用于拼接路径，处理为可被 shell 执行的路径
 * @param paths 路径组
 * @returns 拼接后的路径
 */
export function joinPath(...paths: string[]): string {
  try {
    const base = join(...paths);
    return process.platform == 'win32'
      ? base.replace(/\\/g, '/')
      : base.replace(/(?=\W+)\s+(?<=\W+)/g, '\\ ');
  } catch (error: any) {
    debugLog(
      {
        id: module.id,
        sign: 'joinPath'
      },
      error?.message
    );
    return '';
  }
}
