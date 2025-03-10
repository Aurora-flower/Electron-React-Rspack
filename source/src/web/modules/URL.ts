/**
 * @file URL API 相关
 */

/**
 * 创建对象 URL 的数据
 * @param blob Blob 对象
 * @returns 一个以 `blob:` 开头的字符串 URL，表示已创建的临时对象 URL
 * @description
 * URL.createObjectURL() 是一个 Web API 方法，允许将 Blob 或 File 对象转换为一个临时的 URL（也称为对象 URL）。
 * 这个 URL 可以用来在浏览器中引用这些对象，通常用于显示图像、播放视频等操作，而无需将它们上传到服务器。
 *
 * @remarks
 * 使用场景:
 * - 在前端展示 `Blob` 或 `File` 对象的内容而不需要上传到服务器
 * - 上传文件后，显示用户选择的图像或视频。
 * - 为动态生成的文件（如下载链接）提供临时访问 URL。
 */
export function createObjectURLByBlob(blob: Blob) {
  return URL.createObjectURL(blob);
}

/**
 * @summary 将文件渲染为图片并插入指定容器
 * @description
 * 通过创建临时对象 URL 实现文件预览, 在 img.onload 回调中执行 URL 资源释放。
 */
export function appendImageFromFile(
  file: File,
  element: HTMLElement
) {
  const objectURL = URL.createObjectURL(file);

  // TODO: 这里应该根据选择的文件类型进行对应的处理
  /* 使用这个 URL 来显示图片 */
  const img = document.createElement('img');
  img.src = objectURL;
  element.appendChild(img);
  img.onload = () => {
    /* 图片加载完成后释放 */
    URL.revokeObjectURL(objectURL);
  };

  // 如视频文件类型的处理：
  // const videoElement = document.createElement('video');
  // videoElement.src = objectURL;
  // videoElement.controls = true;
}

/**
 *
 * @param url
 * @description
 * 使用 `URL.createObjectURL()` 创建的对象 URL 会在浏览器的生命周期内有效，
 * 但最好在不再需要它时通过 `URL.revokeObjectURL()` 来显式释放它。
 * 这样可以帮助浏览器回收内存。
 */
export function revokeObjectURL(url: string) {
  /* 清理临时创建的对象 URL */
  URL.revokeObjectURL(url);
}
