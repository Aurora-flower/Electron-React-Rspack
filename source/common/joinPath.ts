import { join } from 'node:path';
// import { debugLog } from '@/common/log';

export function joinPath(...paths: any[]) {
  try {
    const base = join(...paths);
    return process.platform == 'win32'
      ? base.replace(/\\/g, '/')
      : base.replace(/(?=\W+)\s+(?<=\W+)/g, '\\ ');
  } catch (error: any) {
    // debugLog(module.id, 'joinPath', false, error?.message);
    return '';
  }
}
