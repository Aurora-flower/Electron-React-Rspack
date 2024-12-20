/**
 * JS Implementation of MurmurHash2
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * @summary
 * - 应用场景
 *  - 数据索引：在数据库和缓存系统中，哈希值可以用于快速查找和定位数据。
 *  - 数据去重：在大数据处理中，哈希值可以用于检测重复数据，提高处理效率。
 *  - 一致性哈希：在分布式系统中，哈希值可以用于实现一致性哈希，将数据均匀分布到多个节点上。
 *  - 散列映射：在哈希表和字典中，哈希值可以用于快速插入和查找键值对。
 *  - 文件校验：在文件传输和存储中，哈希值可以用于校验文件的完整性和一致性。
 *  - 安全应用：可以用于生成简单的校验码或标识符。
 * @param {string} str ASCII only - 需要哈希的字符串，仅支持 ASCII 字符。
 * @param {number} seed Positive integer only - 初始种子值，必须是正整数。
 * @return {number} 32-bit positive integer hash - 返回一个 32 位的正整数哈希值。
 */

export default function murmurhash2_32_gc(
  str: string,
  seed: number
): number {
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
