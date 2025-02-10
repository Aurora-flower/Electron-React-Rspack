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

/**
 * 创建一个可读流，并设置编码为 utf8
 * @param filepath 文件路径
 * @remarks
 * - 数据流：
 * 可以把数据流看成特殊的数组，只不过数组中的数据分散在空间上，而数据流中的数据是分散在时间上的。
 * 通过将数据一块一块地传送，可以每收到一块数据就开始处理，而不用等所有数据都到全了再做处理。
 *
 */
// export function getDataByStream(filepath: string) {
// const stream = createReadStream(filepath);
// // 当有新的数据块准备好时会激发 data 事件
// stream.on('data', chunk => {
//   console.log(chunk.toString());
// });

// // 设置一个从读取流到写出流的管道
// // stream.pipe(process.stdout);

// // 当所有数据块都加载完之后，会激发一个 end 事件
// stream.on('end', () => {
//   console.log('finish');
// });
// }

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
