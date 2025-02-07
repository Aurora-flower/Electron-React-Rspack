/**
 * @file 本地系统文件处理模块
 */

import { parse } from 'node:path';
import {
  statSync,
  mkdirSync,
  writeFileSync,
  WriteFileOptions
} from 'node:fs';

class FileSystemUtils {
  static existsSync(
    localPath: string,
    type: 'File' | 'Directory'
  ) {
    try {
      const stats = statSync(localPath);

      if (type == 'File') {
        return stats.isFile();
      } else if (type == 'Directory') {
        return stats.isDirectory();
      }
    } catch (_error) {
      return !_error;
    }
  }

  static mkdirDirectory(
    localPath: string,
    options = { recursive: true }
  ) {
    if (!this.existsSync(localPath, 'Directory')) {
      mkdirSync(localPath, options);
    }
  }

  static writeFile(
    localPath: string,
    content: string = '',
    options: WriteFileOptions = { flag: 'w' }
  ) {
    if (!this.existsSync(localPath, 'File')) {
      const { dir } = parse(localPath);
      this.mkdirDirectory(dir);
    }
    writeFileSync(localPath, content, options);
  }
}

export default FileSystemUtils;
