/**
 * @file 离屏渲染
 * @description
 * 离屏渲染允许以位图的方式来获取 BrowserWindow 中的内容，所以它可以在任何地方被渲染，例如在3D场景中的纹理。
 * 注意📢:
 * - 有两种渲染模式可以使用（见下），只有未渲染区域传递到 绘图 事件才能提高效率
 * - 可以停止/继续渲染并设置帧速率
 * - 最高帧速率为 `240`，因为更高的值只会带来性能上的损失而没有任何收益
 * - 当网页上没有发生任何情况时，不会生成帧
 * - 屏幕窗口始终创建为 `无边框窗口`..
 *
 * 渲染模式:
 * - GPU加速
 * GPU 加速渲染意味着使用GPU用于合成。
 * 这也就意味着帧必须从 GPU 拷贝过来，从而需求更多的资源，因此这会比软件输出设备更慢。 这
 * 种模式的优点是支持 WebGL 和 3D CSS 动画.
 *
 * - 软件输出设备
 * 此模式使用软件输出设备在 CPU 中渲染，因此帧 生成的速度要快得多。 因此，此模式优先于 GPU 加速模式。
 *
 */
import { app } from 'electron';

/**
 * @summary 禁用 GPU 加速 (启用离屏渲染)
 *
 * @remarks
 * 在 Electron 中，“离屏渲染”（Offscreen Rendering）并不是截图的意思，但可以用于生成截图。
 * 离屏渲染是指在一个不可见的窗口中渲染网页内容，并获取渲染结果的过程。
 * 这种技术常用于后台任务，比如生成预览图、抓取网页内容等。
 *
 *
 * 注意📢: 若要启用此模式，必须通过调用 `app.disableHardwareAcceleration（）` API禁用 GPU 加速。
 */
export function disableGPUAcceleration() {
  app.disableHardwareAcceleration(); // 表示不使用硬件加速
}
