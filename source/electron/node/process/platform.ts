export const PLATFORM = Object.freeze({
  darwin: "darwin",
  win32: "win32",
  linux: "linux",
  aix: "aix",
  android: "android",
  freebsd: "freebsd",
  haiku: "haiku",
  openbsd: "openbsd",
  sunos: "sunos",
  cygwin: "cygwin",
  netbsd: "netbsd"
} as const satisfies { [K in NodeJS.Platform]: K })

export function getPlatform(platform?: NodeJS.Platform): boolean | string {
  return platform ? process.platform === platform : process.platform
}

export function isWin(): boolean {
  return getPlatform(PLATFORM.win32) as boolean
}
