/**
 * @file Web Storage Hooks
 * @see Window.sessionStorage&Window.localStorage
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Window}
 */

import { getDataType } from "@/utils/functions/dataType"

type StorageType = "sessionStorage" | "localStorage"

interface StorageHook {
  setStorage: (key: string, value: unknown) => void
  getStorage: (key: string) => string | null
  removeStorage: (key: string) => void
  clear: (excludes?: string[]) => void
}

function useStorage(type: StorageType = "sessionStorage"): StorageHook {
  const setStorage = (key: string, value: unknown): void => {
    const valueType = getDataType(value)
    window[type].setItem(key, JSON.stringify({ type: valueType, value }))
  }

  const getStorage = (key: string): string | null => {
    const value = window[type].getItem(key)
    if (value) {
      const { value: val } = JSON.parse(value)
      return val
    } else {
      return value
    }
  }

  const removeStorage = (key: string): void => {
    window[type].removeItem(key)
  }

  const clear = (excludes?: string[]): void => {
    const keys = Object.keys(window[type])
    const defaultExcludes: string[] = []
    const excludesArr = excludes
      ? [...excludes, ...defaultExcludes]
      : defaultExcludes
    const excludesKeys = excludesArr
      ? keys.filter(key => !excludesArr.includes(key))
      : keys
    for (const key of excludesKeys) {
      window[type].removeItem(key)
    }
    window[type].clear()
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear
  }
}

export default useStorage
