export function webLog(moduleId: string, sign: string, ...args: any[]) {
  console.log(`>>> Web Log Source [ ${moduleId} ] - $_${sign}_$`, ...args);
}
