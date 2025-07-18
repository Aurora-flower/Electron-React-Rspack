import { app } from "electron"

/**
 * @summary 请求或创建应用程序实例锁
 * @description 如果当前进程是应用程序的主要实例，则此方法返回 true，同时应用会继续运行。
 * 如果当它返回 false 如果程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。
 * @param {Record<any, any> | undefined}  additionalData 一个包含要发送到第一个实例的附加数据的 JSON 对象。
 * @returns {boolean} 是否成功取得了锁
 * @remarks
 * 在 macOS 上, 当用户尝试在 Finder 中打开应用程序的第二个实例时, 系统会通过发出 `open-file` 和 `open-url` 事件来自动强制执行单个实例,。
 * 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 必须手动调用此方法来确保单实例。
 */
export function gotSingleInstanceLock(
  additionalData?: RecordType<AnyModel>
): boolean {
  return app.requestSingleInstanceLock(additionalData)
}

/**
 * @summary 查看应用实例当前是否持有单例锁
 * @description 可以通过 `app.requestSingleInstanceLock()` 请求锁，
 * 并且通过 `app.releaseSingleInstanceLock()` 释放锁。
 * @returns {boolean}
 */
export function hasSingleInstanceLock(): boolean {
  return app.hasSingleInstanceLock()
}

/**
 * @summary 释放单例锁
 * @description 释放所有由 `requestSingleInstanceLock` 创建的锁。 该方法将允许应用程序的多个实例再次并行运行。
 */
export function releaseSingleInstanceLock(): void {
  app.releaseSingleInstanceLock()
}
