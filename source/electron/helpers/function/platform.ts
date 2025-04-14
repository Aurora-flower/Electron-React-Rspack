export function getPlatform(platform?: NodeJS.Platform): boolean | string {
  if (platform) {
    return process.platform === platform;
  } else {
    return process.platform;
  }
}

export function isWin() {
  return getPlatform("win32") as boolean;
}
