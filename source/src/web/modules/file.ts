/**
 * @file web 中与文件相关的 API
 * @description
 * - `File` `、Blob` 对象都属于 Web 环境下的 API，专门用于在客户端处理二进制数据和文件操作。
 * 它们在浏览器中是非常常用的，尤其是在处理文件上传、下载和操作时。
 * - `FormData` 是浏览器环境中的一个接口，用于构造和操作表单数据，特别是在通过 JavaScript 动态构建和发送表单数据（尤其是文件上传）时非常有用。
 */

import {
  MIME,
  MIMEModel,
  MIME_TYPES
} from '@/common/constant/modules/MIME';

/**
 * @summary 生成一个 Blob 对象
 * @returns {Blob} Blob 对象
 * @remarks
 * - Blob 具有以下属性:
 *    - `size`: 数据的大小，以字节为单位。
 *    - `type`: 数据的 MIME 类型。
 * - Blob 具有以下方法:
 *    - `slice()`: 用于分割 Blob 对象，返回一个新的 Blob 对象。
 *    - `tream()`: 返回一个 ReadableStream，用于读取 Blob 内容。
 *    - `text()`: 返回一个 Promise，解析为 Blob 的文本内容。
 *    - `arrayBuffer()`: 返回一个 Promise，解析为 Blob 的 ArrayBuffer。
 * - Blob 用于处理任意二进制数据。较为通用，可以是文件的一部分，也可以是动态生成的数据。
 */
export function createBlob(
  /* 一个或多个 ArrayBuffer、ArrayBufferView（如 Uint8Array、Int16Array 等）对象 | 一个或多个字符串 | 一个或多个 Blob 对象 */
  content: string[],
  extension: MIMEModel
): Blob {
  const mime = MIME.getMIMEByExtension(extension);
  const type = mime?.mime || MIME_TYPES['.txt'].mime;
  return new Blob(content, {
    /* (可选) 用于指定 Blob 的 MIME 类型*/
    type

    /**
     * @summary (可选) 用于指定如何处理字符串中的换行符。
     * - `transparent`（默认值）: 换行符根据平台决定（例如，Windows 使用 \r\n，Unix 使用 \n）。
     * - `native`: 使用当前平台的默认换行符。
     */
    // endings: 'native'
  });
}

/**
 * @summary 生成一个 File 对象
 * @remarks
 * - File 对象是 Blob 的子类，表示一个文件对象。
 * - File 除了继承了 buffer 外，具有以下属性:
 *  - `name`: 文件的名称。
 *  - `lastModified`: 文件的最后修改时间（UNIX 时间戳）。
 * - File 用于处理用户上传的文件。提供了文件名称，修改时间等信息，方便自文件上传等场景使用。
 */
export function createFile(
  content: string[],
  extension: MIMEModel
) {
  const blob = createBlob(content, extension);
  return new File(content, 'file', { type: blob.type });
}

/**
 * @summary 将一个对象转为 FormData
 */
export function transFormData(
  data: Record<string, Blob | string>
) {
  const formData = new FormData();
  Object.entries(data).map(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

/**
 * @summary 将一个 Blob 对象转为 FormData
 * @description
 */
export function blobToFormData(blob: Blob) {
  const formData = new FormData();
  formData.append('file', blob);
  return formData;
}
