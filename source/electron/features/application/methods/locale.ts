import { app } from "electron"

/**
 * @summary 获取当前应用程序区域
 * @remarks 要设置语言区域，需要在应用启动时使用命令行开关
 * @see {@link https://www.electronjs.org/zh/docs/latest/api/command-line-switches#--lang}
 */
export function getLocale(): string {
  return app.getLocale()
}

/**
 * @summary 获取当前应用程序区域国家代码
 * @returns {string} 用户操作系统的区域设置两个字母的 ISO 3166 国家代码。
 * 该值取自本机操作系统 API
 */
export function getLocaleCountryCode(): string {
  return app.getLocaleCountryCode()
}

/**
 * @summary 获取当前系统区域
 * @remarks
 * - 必须在发出就绪事件之后调用此 API。
 * - 在 `Windows` 和 `Linux`，使用 `Chromium` 的 i18n 库来获取。
 * - 在 `macOS` 上，改为使用 `[NSLocale currentLocale]`。
 * - 为了获得用户当前的系统语言（这种语言并不总是与本地语言相同），
 * 最好使用 `app.getPreferredSystemLanguages()`
 * - 不同的操作系统也以不同的方式使用区域数据:
 *    - Windows 11 使用数字、日期和时间的区域格式。
 *    - macOS Monterey 使用该区域来格式化数字、日期、时间以及选择要使用的货币符号。
 */
export function getSystemLocale(): string {
  return app.getSystemLocale()
}

/**
 * @summary 获取系统首选语言
 * @returns {StringArray} 从最喜欢到最不喜欢的用户首选系统语言，包括国家代码（如果适用）
 * @remarks
 * -  用户可以在 Windows 或 macOS 上通过语言和区域设置、修改、添加此列表。
 * - API 的实现:
 *    - 在 `Windows` 上使用 `GlobalizationPreferences`（回退到 `GetSystemPreferredUILanguages`）
 *    - 在 `macOS` 上使用 `[NSLocare preferredLanguages]`
 *    - 在 `Linux` 上使用 `g_get_language_names`
 * - 使用场景: 决定应用程序的呈现语言。
 */
export function getPreferredSystemLanguages(): StringArray {
  return app.getPreferredSystemLanguages()
}
