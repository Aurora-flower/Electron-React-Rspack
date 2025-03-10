declare namespace Common {
  /**
   * @summary BlobPart 类型定义 - 这里是暂时写法，因为直接使用 BlobPart 会 eslint 报错
   */
  type BlobPartCustom =
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | string;

  /* ***** ***** ***** ***** 存储类型 ***** ***** ***** ***** */
  type StorageType = 'localStorage' | 'sessionStorage';
}
