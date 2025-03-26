/**
 * @file 用于生成类名
 */
import { CommonUtility } from '@/common/utils';
import { debugLog } from '@/common/helper/log';
import { DATA_TYPE_MODE } from '@/common/constant';

const { getDataType } = CommonUtility;

/**
 * Hook - 处理类名的生成 - 类名生成器
 * @param classNames 类名列表
 * @returns {string} classNameList String
 * ToDo: 扩展 - 使得其实现类似 classnames 库的功能
 *
 * 思路灵感：
 * {@link https://www.npmjs.com/package/classnames npm classnames}
 * {@link https://github.com/JedWatson/classnames github classnames}
 */
function useClassNames(classNames: Array<unknown>): string {
  try {
    const classnames = classNames.filter(Boolean);

    const processedClassNames = classnames.reduce(
      (pre: string[], current) => {
        const dataType = getDataType(current);
        if (dataType == DATA_TYPE_MODE.String) {
          pre.push(current as string);
        } else if (dataType == DATA_TYPE_MODE.Object) {
          const val = current as Record<string, boolean>;
          Object.keys(val).forEach((item: string) => {
            if (val[item]) {
              pre.push(item);
            }
          });
        } else if (dataType == DATA_TYPE_MODE.Array) {
          pre.push(...(current as any).filter(Boolean));
        }
        return pre;
      },
      []
    );

    return processedClassNames.join(' ');
  } catch (error: unknown) {
    debugLog(
      {
        id: module.id,
        sign: 'UseClassNames error'
      },
      (error as Error)?.message
    );
    return '';
  }
}

export default useClassNames;
