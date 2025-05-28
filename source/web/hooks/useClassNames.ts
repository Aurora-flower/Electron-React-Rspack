import { DATA_TYPE_MODE, isType } from "@/utils/functions/dataType"
import { webError } from "@/utils/log"

function useClassNames(classNames: Array<unknown>): string {
  try {
    const classnames = classNames.filter(Boolean)
    const processedClassNames = classnames.reduce(
      (pre: string[], current, _index, _self) => {
        if (isType(current, DATA_TYPE_MODE.String)) {
          const data = current as string
          pre.push(data.trim() as string)
        } else if (isType(current, DATA_TYPE_MODE.Object)) {
          const data = current as ObjectType<unknown>
          for (const item of Object.keys(data)) {
            if (item in data && data[item]) {
              pre.push(item)
            }
          }
        } else if (Array.isArray(current)) {
          pre.push(...current.filter(Boolean))
        }
        return pre
      },
      []
    )
    return processedClassNames.join(" ").replace(/\bundefined\b/g, "")
  } catch (error: unknown) {
    webError("useClassNames", "error", error)
    return ""
  }
}

export default useClassNames
