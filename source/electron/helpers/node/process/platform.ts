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
} as const satisfies { [K in NodeJS.Platform] K });

export function getPlatform(platform?: NodeJS.Platform): boolean | string {
  if (platform) {
    return process.platform === platform;
  } else {
    return process.platform;
  }
}

export function isWin() {
  return getPlatform(PLATFORM.win32) as boolean;
}
