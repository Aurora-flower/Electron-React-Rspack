/**
 * @file Buffer 模块
 * @description
 * `ArrayBuffer`、`ArrayBufferView` 都是 JavaScript 中用于处理二进制数据的对象和类型，
 * 它们通常用于处理原始二进制数据，如文件、网络请求中的数据流，或者与 Web API 进行交互时的低级数据操作。
 */

/**
 * @summary Blob 对象转 ArrayBuffer 对象
 */
export function blobToArrayBuffer(blob: Blob) {
  return blob.arrayBuffer();
}

export function fileReader(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(file);
    // reader.readAsArrayBuffer(blob);
  });
}
