/**
 * @file 平台相关的变量
 */

export const platform: Record<NodeJS.Platform, NodeJS.Platform> =
  {
    win32: 'win32',
    darwin: 'darwin',
    linux: 'linux',
    aix: 'aix',
    android: 'android',
    freebsd: 'freebsd',
    haiku: 'haiku',
    openbsd: 'openbsd',
    sunos: 'sunos',
    cygwin: 'cygwin',
    netbsd: 'netbsd'
  };
