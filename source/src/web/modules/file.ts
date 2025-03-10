/**
 * @file web 中与文件相关的 API
 * @description
 * 涉及到 `File`、`Blob`、`ArrayBuffer`、`ArrayBufferView`、 `FormData`、`FileReader` 等 API 的封装。
 * @remarks
 * - `File` `、Blob` 对象都属于 Web 环境下的 API，专门用于在客户端处理二进制数据和文件操作。
 * 它们在浏览器中是非常常用的，尤其是在处理文件上传、下载和操作时。
 * - `ArrayBuffer`、`ArrayBufferView` 都是 JavaScript 中用于处理二进制数据的对象和类型，
 * 它们通常用于处理原始二进制数据，如文件、网络请求中的数据流，或者与 Web API 进行交互时的低级数据操作。
 * - `FormData` 是浏览器环境中的一个接口，用于构造和操作表单数据，特别是在通过 JavaScript 动态构建和发送表单数据（尤其是文件上传）时非常有用。
 */

import {
  MIME,
  MIMEModel,
  MIME_TYPES
} from '@/common/constant/modules/MIME';

/* ***** ***** ***** ***** Blob API 相关 ***** ***** ***** ***** */

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
  content: Common.BlobPartCustom[],
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
 * @summary Blob 对象转 ArrayBuffer 对象
 */
export function blobToArrayBuffer(blob: Blob) {
  return blob.arrayBuffer();
}

/* ***** ***** ***** ***** ArrayBuffer API 相关 ***** ***** ***** ***** */

/**
 * @summary 创建 ArrayBuffer 对象
 */
export function createArrayBuffer(): ArrayBufferView {
  const buffer = new ArrayBuffer(16);
  /* 创建一个视图，可以通过该视图操作 ArrayBuffer 中的数据 */
  const view = new Uint8Array(buffer);
  return view;
}

/* ***** ***** ***** ***** File API 相关 ***** ***** ***** ***** */

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
  /* 代表了文件的实际内容 */
  content: Common.BlobPartCustom[],
  /* 该参数指定文件的名称，通常包括文件的扩展名 */
  fileName: string,
  extension: MIMEModel
) {
  const blob = createBlob(content, extension);
  return new File([blob], fileName, {
    type: blob.type

    /* (可选) 默认值是当前时间 */
    // lastModified: Date.now()
  });
}

/* ***** ***** ***** ***** FormData API 相关 ***** ***** ***** ***** */

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
export function blobToFormData(blob: Blob, key = 'file') {
  const formData = new FormData();
  formData.append(key, blob);
  return formData;
}

/* ***** ***** ***** ***** FileReader API 相关 ***** ***** ***** ***** */

/**
 * @summary 将一个 File 对象转为 FormData
 * @description
 */
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

/* ***** ***** ***** ***** File System Access API 相关 ***** ***** ***** ***** */

/**
 * @summary 保存文件
 * @description
 * - `showSaveFilePicker` 是一个现代浏览器中的API，属于 `File System Access API` 的一部分，主要用于让网页访问本地文件系统。(实验性 API)
 * - npm install -D @types/wicg-file-system-access
 */
export async function saveFile() {
  // 添加特性检测
  if (!('showSaveFilePicker' in window)) {
    throw new Error('当前浏览器不支持 File System Access API');
  }
  const handle = await window.showSaveFilePicker();
  const writable = await handle.createWritable();
  await writable.write('Hello, World!');
  await writable.close();
}
