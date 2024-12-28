/**
 * @file 用于在调试模式下输出日志。
 */
export function debugLog(
  scriptModuleId: string,
  sign?: string,
  ...args: unknown[]
) {
  if (process.env?.NODE_ENV === 'production') return;

  console.log(
    `>>> Origin Module [ ${scriptModuleId} ] - ${sign}: `,
    args.length > 0 ? args : null
  );
}
