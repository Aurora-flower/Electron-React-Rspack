export function webLog(moduleId: string, sign: string, ...args: unknown[]) {
  console.log(`>>> Web Log Source [ ${moduleId} ] - $_${sign}_$`, ...args)
}
