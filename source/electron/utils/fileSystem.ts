/**
 * @file 本地系统文件处理模块
 * 注意📢: 运行子进程的关键关注点是能不能及时的终止释放进程
 */
import { parse } from 'node:path';
import {
  statSync,
  mkdirSync,
  readFile,
  // readFileSync,
  writeFileSync,
  WriteFileOptions
} from 'node:fs';
import { debugLog } from '@/common/helper/log';

/**
 * 创建一个可读流，并设置编码为 utf8
 * @param filepath 文件路径
 * @remarks
 * - 数据流:
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

// TODO: buffer
/**
 * @file Buffer 模块
 * @remarks Buffer 是 Node.js 中的一个核心模块，用于处理二进制数据。它提供了一种用于操作二进制数据的方式，
 */
class BufferUtils {
  /**
   * @summary 将 Buffer 转换为 ArrayBuffer
   * @param {Buffer} buffer - 要转换的 Buffer 对象
   * @returns {ArrayBuffer} 转换后的 ArrayBuffer 对象
   */
  static bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
    const arrayBuffer = buffer.buffer;
    return arrayBuffer.slice(
      /* byteOffset 是 buffer 的起始字节偏移量 */
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }

  /**
   * @summary 将 ArrayBuffer 转换为 Buffer
   * @param {ArrayBuffer} content - 要转换的 ArrayBuffer 对象
   * @returns {Buffer} 转换后的 Buffer 对象
   */
  static createBuffer(
    content: ArrayBuffer,
    byteOffset: number,
    byteLength: number
  ): Buffer {
    return Buffer.from(content, byteOffset, byteLength);
  }
}

/**
 * @summary 文件系统操作
 * @remarks
 * - `Web API` 中的 `FileSystem` 指 `File System Access API`，是用于浏览器中与用户文件系统交互的 API。
 * - `Node.js` 中的 `FileSystem` 通常指的是 `fs` 模块，它用于操作服务器端的文件系统。
 */
class FileSystemUtils extends BufferUtils {
  /**
   * @summary 判断文件是否存在
   * @param {string} localPath - 文件路径
   * @param {string} [type] - 文件类型
   * @returns {boolean} - 文件是否存在
   */
  static existsSync(
    localPath: string,
    type?: 'File' | 'Directory' | undefined
  ): boolean {
    try {
      const stats = statSync(localPath);
      if (type == 'File') {
        return stats.isFile();
      } else if (type == 'Directory') {
        return stats.isDirectory();
      }
      return !!stats;
    } catch (_error) {
      return false;
    }
  }

  /**
   * @summary 创建文件夹
   * @param localPath 文件夹路径
   * @param options  创建文件夹的选项
   */
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

  /**
   * @summary 读取文件内容
   * @remarks
   * - 如果指定了 `encoding` 参数（例如 `utf-8` 或 `ascii`），它会返回一个 字符串。
   * - 如果不指定 `encoding` 或使用 `null`，默认会返回 `Buffer` 对象。
   * 直接使用 `Buffer` 会包含二进制数据，使用 `Buffer` 方法 `buffer.buffer` 或其他转换方法，可以获取底层的 `ArrayBuffer`。
   */
  static readFileToData(localPath: string) {
    return new Promise<boolean>(resolve => {
      readFile(
        localPath,
        { encoding: 'utf-8' },
        (error, data) => {
          if (error) {
            resolve(false);
          } else {
            debugLog(
              {
                id: module.id,
                sign: 'Read File'
              },
              data
            );
            resolve(true);
          }
        }
      );
    });
  }

  // static writeJsonFile(
  //   localPath: string,
  //   content: unknown = {},
  //   options: WriteFileOptions = { flag: 'w' }
  // ) {
  //   try {
  //     this.writeFile(
  //       localPath,
  //       JSON.stringify(content, null, 2),
  //       options
  //     );
  //   } catch (error) {
  //   }
  // }

  // static readFile(
  //   localPath: string
  //   // options:
  // ) {
  //   try {
  //   } catch (error) {
  //   }
  // }

  // static readJsonFile(localPath: string) {
  //   try {
  //     const content = this.readFile(localPath);
  //     return content ? JSON.parse(content) : content;
  //   } catch (error) {
  //   }
  // }
}

export default FileSystemUtils;
