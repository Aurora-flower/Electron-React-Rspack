/**
 * @file 通过 crypto 实现加密、解密功能
 * @description `node:crypto` 模块提供了加密功能，其中包括了用于 OpenSSL 散列、HMAC、加密、解密、签名、以及验证的函数的一整套封装。
 */
import {
  type BinaryLike,
  scryptSync,
  randomBytes,
  // createHash,
  createCipheriv,
  createDecipheriv
} from 'node:crypto';
import fs from 'fs-extra';
// import _7z from '7zip-min';
import _7z from '7zip-bin';
import archiver from 'archiver';
import { rimraf } from 'rimraf';
import { join } from 'node:path';
import { exec } from 'child_process';
// import { isWin } from '@/electron/helper';
// import { existsSync } from 'node:fs';
// import murmurhash2_32_gc from '@/common/_modules_/transcribe/murmurhash2_gc';

function murmurhash2_32_gc(str: string, seed: number): number {
  let l = str.length,
    h = seed ^ l,
    i = 0,
    k: number;

  while (l >= 4) {
    k =
      (str.charCodeAt(i) & 0xff) |
      ((str.charCodeAt(++i) & 0xff) << 8) |
      ((str.charCodeAt(++i) & 0xff) << 16) |
      ((str.charCodeAt(++i) & 0xff) << 24);

    k =
      (k & 0xffff) * 0x5bd1e995 +
      ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);
    k ^= k >>> 24;
    k =
      (k & 0xffff) * 0x5bd1e995 +
      ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);

    h =
      ((h & 0xffff) * 0x5bd1e995 +
        ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^
      k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
        (h & 0xffff) * 0x5bd1e995 +
        ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h =
    (h & 0xffff) * 0x5bd1e995 +
    ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
  h ^= h >>> 15;

  return h >>> 0;
}

interface OptionsModel {
  /**
   * 输入目录
   */
  input: string;

  /**
   * 输出目录
   */
  output: string;

  /**
   * 当输出位置存在，是否清除
   */
  clean: boolean;
}

interface UnzipOptions extends OptionsModel {
  /**
   * 是否覆盖已存在文件
   * @default true
   */
  overwrite?: boolean;
}

export class Security {
  /* ***** ***** ***** ***** 配置：指定算法、密钥 ***** ***** ***** ***** */
  /* 向量 - 识别加密片段 - Buffer<ArrayBufferLike> */
  private _iv: Buffer = Buffer.alloc(16);

  /* 密钥 - 解密文件的密钥 */
  private _key: Buffer = Buffer.alloc(32);

  /* 使用 AES-256 加密算法 */
  private _algorithm: string = 'aes-256-cbc';

  /* 密码 - 用于压缩包体的加密 */
  private _plaintext: string = '';
  private _password: string = '';

  constructor(
    key: string /* 内部文件的片段加密 */,
    password: string /* 压缩包体的加密 */
  ) {
    this._plaintext = password;
    this._password = this.hash(password);
    this.setKey(key);
  }

  /**
   * 从配置片段派生密钥
   * @param key 生成密钥的片段
   */
  setKey(key: string) {
    this._key = scryptSync(key, 'salt', 32);
  }

  /**
   * @summary 获取密码
   */
  getPassword() {
    return this._password;
  }

  /* ***** ***** ***** ***** 工具函数 ***** ***** ***** ***** */

  /**
   * @summary 初始化向量 (IV) 的随机化实现 (generate)
   */
  ivGen() {
    // const iv = Buffer.alloc(16);
    // for (let i = 0; i < iv.length; i++) {
    //   iv[i] = Math.floor(Math.random() * 256);
    // }

    return randomBytes(
      16
    ); /* 生成 16 字节随机 IV（适合 AES-256-CBC） */
  }

  /**
   * @summary 哈希函数
   * @description
   * 在加密和散列（哈希）算法中，不可逆且生成固定值的加密算法通常指的是 `哈希函数`。
   * 哈希函数将输入数据（如文本、文件等）转化为固定长度的哈希值（也叫散列值），并且其特性之一是不可逆——即无法从哈希值恢复原始输入。
   */
  hash(psd: string, _algorithm = 'sha256'): string {
    // const cipher = createHash(algorithm)
    //   .update(psd)
    //   .digest('hex');
    return murmurhash2_32_gc(psd, 0).toString();
  }

  /**
   * 加密文件内容
   * @param {Buffer} buffer - 原始文件内容
   * @returns {Buffer} 加密后的二进制数据
   */
  encryptBuffer(buffer: BinaryLike): Buffer {
    try {
      // this._iv = Buffer.from('hello world');
      this._iv = this.ivGen(); /* 每次加密生成新的随机向量 */
      const cipher = createCipheriv(
        this._algorithm,
        this._key,
        this._iv
      );

      return Buffer.concat([
        this._iv /* 将 IV 附加到密文前部 */,
        cipher.update(buffer),
        cipher.final()
      ]);
    } catch (error: any) {
      console.log('encryptBuffer Error:', error?.message);
      return Buffer.alloc(0);
    }
  }

  /**
   * 解密文件内容
   * @param {Buffer} buffer - 加密的二进制数据
   * @returns {Buffer} 解密后的原始数据
   */
  decryptBuffer(combinedBuffer: Buffer): Buffer {
    try {
      const iv = combinedBuffer.subarray(0, 16); // 提取前 16 字节作为 IV
      const encryptedData =
        combinedBuffer.subarray(16); /* 实际密文 */
      console.log('decryptBuffer', iv.toString('hex'));
      const decipher = createDecipheriv(
        this._algorithm,
        this._key,
        // this._iv
        iv
      );
      return Buffer.concat([
        decipher.update(encryptedData),
        decipher.final()
      ]);
    } catch (error: any) {
      console.log('decryptBuffer Error:', error?.message);
      return Buffer.alloc(0);
    }
  }

  /**
   * @summary 加密整个目录
   */
  async encryptDirectory(options: OptionsModel) {
    if (options.clean) {
      // await fs.remove(options.output);
      await rimraf(options.output);
    }
    await processDirectory(
      options.input,
      options.output,
      this.encryptBuffer.bind(this)
    );
    console.log('✅ Encryption completed', _7z.path7za);
  }

  /**
   * @summary 解密整个目录
   */
  async decryptDirectory(options: OptionsModel) {
    if (options.clean) {
      // await fs.remove(options.output);
      await rimraf(options.output);
    }
    await processDirectory(
      options.input,
      options.output,
      this.decryptBuffer.bind(this)
    );
    console.log('✅ Decryption completed', _7z.path7za);
  }

  /* ***** ***** ***** ***** 解压缩加密包体 ***** ***** ***** ***** */

  /**
   * 携带密码压缩整个目录
   * @remarks
   * 注意📢:
   * - 使用 7za 直接压缩原始目录并设置密码，而不是对已经生成的 ZIP 文件再次处理。否则会造成嵌套的压缩包。
   */
  zip(options: OptionsModel) {
    return new Promise(resolve => {
      try {
        const psd = this._plaintext; // this._password; 这里用加密密码会造成解压时需要输入加密密码，而不是原密码
        const out = options.output;
        if (options.clean && fs.existsSync(out)) {
          fs.unlinkSync(out);
        }
        const output = fs.createWriteStream(out);
        const archive = archiver('zip', {
          zlib: { level: 9 }
        });

        // 设置输出流
        archive.pipe(output);

        // 添加文件到压缩包
        archive.directory(options.input, false);

        // 最后调用 finalize 方法来结束压缩
        archive.finalize();

        // 等待文件生成后进行加密
        output.on('close', () => {
          // 临时文件路径  -- 主要用于
          const tempZip = out + '.tmp';

          // 重命名原始文件
          fs.renameSync(out, tempZip);

          const bin = _7z.path7za;

          // 使用 7zip 重新打包并加密原始内容
          exec(
            `"${bin}" a -p${psd} "${out}" "${options.input}/*" -r`,
            err => {
              if (err) {
                console.log('Error during encryption:', err);
                return;
              }
              // 删除临时文件
              fs.unlinkSync(tempZip);
              console.log('Encryption completed', bin);
            }
          );
        });
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  /**
   * 解压由 `zip` 压缩的包体
   * @param {string} inputDir - 要加密的目录
   * @param {string} outputDir - 加密后的输出目录
   * @returns
   */
  async unzip(options: UnzipOptions) {
    try {
      // 清理输出目录
      if (options.clean) {
        await rimraf(options.output);
      }
      const psd = this._plaintext;
      await fs.ensureDir(options.output);
      const bin = _7z.path7za;

      return new Promise(resolve => {
        exec(
          `"${bin}" x -p${psd} -o"${options.output}" "${options.input}" -y`,
          err => {
            if (err) {
              console.log('Unzip Error:', err.message);
              resolve(true);
            } else {
              console.log('✅ Decompression completed', bin);
              resolve(true);
            }
          }
        );
      });
    } catch (error: any) {
      console.log('Unzip Error:', error?.message);
      return false;
    }
  }
}

/**
 * 处理目录（加密/解密）
 * @param {string} srcDir - 源目录
 * @param {string} destDir - 目标目录
 * @param {function} processor - 处理函数（加密或解密）
 */
export async function processDirectory(
  srcDir: string,
  destDir: string,
  processor: (data: Buffer) => Buffer
) {
  try {
    await fs.ensureDir(destDir);
    const items = await fs.readdir(srcDir);
    for (const item of items) {
      const srcPath = join(srcDir, item);
      const destPath = join(destDir, item);
      const stat = await fs.stat(srcPath);

      if (stat.isDirectory()) {
        await processDirectory(srcPath, destPath, processor);
      } else {
        const data = await fs.readFile(srcPath);
        // const name = path.parse(srcPath).name;
        // const destPath = path.join(destDir, `${name}.qn`);
        await fs.writeFile(destPath, processor(data));
        console.log(`Processed: ${srcPath} -> ${destPath}`);
      }
    }
  } catch (err: any) {
    console.log(`Error processing ${srcDir}:`, err?.message);
  }
}

function start() {
  const secure = new Security('qnfuture', '000802');
  // const en = secure.encryptBuffer(Buffer.from('hello world'));
  // setTimeout(() => {
  //   const secure1 = new Security('qnfuture', '001802');
  //   const de = secure1.decryptBuffer(en);
  //   console.log('start', en, de.toString());
  // }, 1000 * 1.5);

  secure
    .encryptDirectory({
      input:
        '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/source',
      output:
        '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/en',
      clean: true
    })
    .then(() => {
      secure
        .decryptDirectory({
          input:
            '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/en',
          output:
            '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/de',
          clean: true
        })
        .then(() => {
          console.log('解密完成');
        });
    });

  // secure
  //   .zip({
  //     input:
  //       '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/source',
  //     output:
  //       '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/en/output.zip',
  //     clean: true
  //   })
  //   .then(() => {
  //     setTimeout(() => {
  //       secure
  //         .unzip({
  //           input:
  //             '/Users/HuaYing/Desktop/resources/Local/ER/' +
  //             'test/pack/en/output.zip',
  //           output:
  //             '/Users/HuaYing/Desktop/resources/Local/ER/test/pack/de',
  //           clean: true
  //         })
  //         .then(() => {
  //           console.log('解密完成');
  //         });
  //     }, 1000 * 1.5);
  //   });
  // console.log(secure.hash('000802'), secure.hash('000802'));
}

start();
