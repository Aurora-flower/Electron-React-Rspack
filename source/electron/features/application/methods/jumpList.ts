import { app } from "electron"
import type {
  JumpListCategory,
  JumpListItem,
  JumpListSettings,
  Task
} from "electron/main"

/**
 * @platform win32
 * @summary 将任务添加到 Windows 上“跳转列表”的“任务”类别中。
 * 注意📢: 进一步自定义跳转列表，请使用 `app.setJumpList`
 */
export function setUserTasks(tasks: Task[]): boolean {
  return app.setUserTasks(tasks)
}

interface JumpListSettingsModel {
  /**
   * 跳转列表中显示的最小项目数
   */
  minItems: number
  /**
   * @summary 与用户从跳转列表的自定义类别中明确移除的项目相对应的 JumpListItem 对象数组
   * 这些项目不能在 next 调用 app.setJumpList() 时重新添加到跳转列表中, Windows 不会显示任何包含已删除项目的自定义类别
   */
  removedItems: JumpListItem[]
}

/**
 * @platform win32
 * @returns {JumpListSettingsModel}
 */
export function getJumpListSettings(): JumpListSettings {
  return app.getJumpListSettings() as JumpListSettingsModel
}

type setJumpListResult =
  /**
   * 没有出现错误
   */
  | "ok"
  /**
   * 发生一个或多个错误，启用运行日志记录找出可能的原因
   */
  | "error"
  /**
   * 已尝试在跳转列表中向自定义类别添加分隔符。 分隔符只允许在标准 Tasks 类别下出现。
   */
  | "invalidSeparatorError"
  /**
   * 尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
   */
  | "fileTypeRegistrationError"
  /**
   * 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。
   */
  | "customCategoryAccessDeniedError"

/**
 * @platform win32
 * @summary 设置或删除应用程序的自定义跳转列表
 * @param {JumpListCategory []} categories JumpListCategory 的对象数组
 * @remarks
 * - 如果类别为空，则之前设置的自定义跳转列表;
 * （如果有的话）将被应用程序的标准跳转列表（由 Windows 管理）替换。
 * - 如果 JumpListCategory 对象既没有设置类型也没有设置名称属性，则假定其类型为任务。
 * 如果设置了 name 属性但省略了type属性，则假定该类型是自定义的。
 * - 用户可以从自定义类别中删除项目，在下次成功调用 `app.setJumpList(categories)`之前，Windows 不允许将删除的项目添加回自定义类别。
 * 在此之前将已删除的项目重新添加到自定义类别的任何尝试都将导致整个自定义类别从跳转列表中省略。
 * 可以使用 `app.getJumpListSettings` 获取已删除项目的列表。
 * - 跳转列表项的描述属性的最大长度为 **260** 个字符。超过此限制，该项目将不会添加到跳转列表中，也不会显示。
 */
export function setJumpList(
  categories: JumpListCategory[] | null
): setJumpListResult {
  return app.setJumpList(categories)
}
