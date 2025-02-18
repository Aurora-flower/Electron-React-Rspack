import { join } from 'node:path';

/**
 * 拼接路径
 * @param paths 路径组
 * @returns 拼接后的路径
 */
export function joinPath(...paths: any[]) {
  try {
    const base = join(...paths);
    return process.platform == 'win32'
      ? base.replace(/\\/g, '/')
      : base.replace(/(?=\W+)\s+(?<=\W+)/g, '\\ ');
  } catch (error: any) {
    return '';
  }
}
