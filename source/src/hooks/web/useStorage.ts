/**
 * @file Web Storage Hooks
 * @see Window.sessionStorage&Window.localStorage
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Window}
 */
import { CommonUtility } from '@/common/utils/common';

function useStorage(
  type: Common.StorageType = 'sessionStorage'
) {
  const setStorage = (key: string, value: unknown) => {
    const valueType = CommonUtility.getDataType(value);
    window[type].setItem(
      key,
      JSON.stringify({ type: valueType, value })
    );
  };

  const getStorage = (key: string) => {
    const value = window[type].getItem(key);
    if (value) {
      const { value: val } = JSON.parse(value);
      return val;
    } else {
      return value;
    }
  };

  const removeStorage = (key: string) => {
    window[type].removeItem(key);
  };

  const clear = (excludes?: string[]) => {
    // 获取排除项;
    const keys = Object.keys(window[type]);
    const defaultExcludes: string[] = [];
    const excludesArr = excludes
      ? [...excludes, ...defaultExcludes]
      : defaultExcludes;
    const excludesKeys = excludesArr
      ? keys.filter(key => !excludesArr.includes(key))
      : keys;
    // 排除项不清除
    excludesKeys.forEach(key => {
      window[type].removeItem(key);
    });
    window[type].clear();
  };

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear
  };
}

export default useStorage;
