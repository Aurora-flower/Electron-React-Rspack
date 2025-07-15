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
  clear: (excludes?: StringArray) => void
}

function useStorage(storageType: StorageType = "sessionStorage"): StorageHook {
  const setStorage = (key: string, value: unknown): void => {
    const valueType = getDataType(value)
    window[storageType].setItem(key, JSON.stringify({ type: valueType, value }))
  }

  const getStorage = (key: string): string | null => {
    const value = window[storageType].getItem(key)
    if (value) {
      const { value: val } = JSON.parse(value)
      return val
    } else {
      return value
    }
  }

  const removeStorage = (key: string): void => {
    window[storageType].removeItem(key)
  }

  const clear = (excludes?: StringArray): void => {
    const keys = Object.keys(window[storageType])
    const defaultExcludes: StringArray = []
    const excludesArr = excludes
      ? [...excludes, ...defaultExcludes]
      : defaultExcludes
    const excludesKeys = excludesArr
      ? keys.filter(key => !excludesArr.includes(key))
      : keys
    for (const key of excludesKeys) {
      window[storageType].removeItem(key)
    }
    window[storageType].clear()
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear
  }
}

export default useStorage
